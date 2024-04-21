# audio_resnet.py
import argparse
import os
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
import torchaudio
import torchvision
from PIL import Image
from torch.utils.data import DataLoader, Dataset
from torchvision import models
from sklearn.model_selection import train_test_split
import librosa

# Define the dataset class
class AudioDataset(Dataset):
    def __init__(self, df, data_dir, transform=None):
        self.df = df
        self.data_dir = data_dir
        self.transform = transform

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        audio_path = os.path.join(self.data_dir, self.df.iloc[idx]['filename'])
        clip, sr = librosa.load(audio_path, sr=None)
        specs = self.transform(clip)
        target = self.df.iloc[idx]['target']
        return specs, target

# Define the spectrogram transformation
def spectrogram_transform(sample_rate, n_fft, n_mels):
    window_sizes = [25, 50, 100]
    hop_sizes = [10, 25, 50]
    num_channels = 3

    transforms = []
    for i in range(num_channels):
        window_length = int(round(window_sizes[i] * sample_rate / 1000))
        hop_length = int(round(hop_sizes[i] * sample_rate / 1000))

        transform = torchvision.transforms.Compose([
            torchaudio.transforms.MelSpectrogram(
                sample_rate=sample_rate,
                n_fft=n_fft,
                win_length=window_length,
                hop_length=hop_length,
                n_mels=n_mels
            ),
            torchaudio.transforms.AmplitudeToDB(),
            torchvision.transforms.Resize((128, 250)),
            torchvision.transforms.Lambda(lambda x: x - x.min()),
            torchvision.transforms.Lambda(lambda x: x / x.max()),
        ])
        transforms.append(transform)

    def multi_channel_transform(clip):
        specs = []
        for transform in transforms:
            spec = transform(clip)
            specs.append(spec)
        return torch.stack(specs)

    return multi_channel_transform

# Define the main function
def main(args):
    # Load the dataset
    df_fsc22 = pd.read_csv(os.path.join(args.data_dir, 'metadata.csv'))
    df_fsc22['target'] = df_fsc22['target'] - 1

    # Split the dataset
    df_train, df_test = train_test_split(df_fsc22, test_size=args.validation_size, stratify=df_fsc22['target'], random_state=42)

    # Define the transformation
    transform = spectrogram_transform(sample_rate=args.sample_rate, n_fft=args.n_fft, n_mels=args.n_mels)

    # Create the dataset and dataloader
    train_dataset = AudioDataset(df_train, args.data_dir, transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True)

    # Load the pretrained ResNet model
    model = models.resnet34(pretrained=True)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 27)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    # Define the loss function and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=args.learning_rate)

    # Train the model
    for epoch in range(args.epochs):
        loss = train(model, train_loader, criterion, optimizer, device)
        print(f"Epoch {epoch+1}, Loss: {loss}")

    # Evaluate the model
    test_dataset = AudioDataset(df_test, args.data_dir, transform=transform)
    test_loader = DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False)
    accuracy = evaluate(model, test_loader, device)
    print(f'Accuracy of the network on the test images: {accuracy} %')

# Define the argument parser
if __name__ == '__main__':
    parser = argparse.ArgumentParser()

    # Hyperparameters sent by the client are passed as command-line arguments to the script.
    parser.add_argument('--epochs', type=int, default=10)
    parser.add_argument('--batch_size', type=int, default=32)
    parser.add_argument('--learning_rate', type=float, default=0.001)
    parser.add_argument('--validation_size', type=float, default=0.3)
    parser.add_argument('--backend', type=str, default='gloo')
    parser.add_argument('--data_dir', type=str, default=os.environ['SM_CHANNEL_TRAIN'])
    parser.add_argument('--sample_rate', type=int, default=44100)
    parser.add_argument('--n_fft', type=int, default=4410)
    parser.add_argument('--n_mels', type=int, default=128)

    # Parse the arguments
    args = parser.parse_args()

    main(args)
