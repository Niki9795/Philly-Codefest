# inference.py
import os
import torch
import torchaudio
from torchvision import models, transforms
from torch.utils.data import Dataset, DataLoader
import librosa
import numpy as np
from PIL import Image


# Define the same AudioDataset class as used during training
class AudioDataset(Dataset):
    def __init__(self, features):
        self.features = features

    def __len__(self):
        return len(self.features)

    def __getitem__(self, idx):
        sample = self.features[idx]
        audio = sample["audio"]
        image = torch.tensor(sample["values"], dtype=torch.float32)
        target = torch.tensor(sample["target"], dtype=torch.long)
        return image, target


# Define the model_fn to load the model
def model_fn(model_dir):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = models.resnet34(weights=None)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 27)
    with open(os.path.join(model_dir, "trained_model.pth"), "rb") as f:
        model.load_state_dict(torch.load(f))
    return model.to(device)


# Define the input_fn to process the input data
def input_fn(request_body, request_content_type):
    if request_content_type == "application/wav":
        # Load the audio file
        audio, sr = librosa.load(request_body, sr=44100, mono=True)

        # Pad/trim the audio signal to the same length
        if len(audio) > 5 * sr:
            audio = audio[: 5 * sr]
        else:
            audio = np.pad(audio, (0, max(0, 5 * sr - len(audio))), "constant")

        # Convert to PyTorch tensor
        audio_tensor = torch.Tensor(audio)

        # Extract spectrogram
        num_channels = 3
        window_sizes = [25, 50, 100]
        hop_sizes = [10, 25, 50]
        specs = []
        for i in range(num_channels):
            window_length = int(round(window_sizes[i] * sr / 1000))
            hop_length = int(round(hop_sizes[i] * sr / 1000))

            spec = torchaudio.transforms.MelSpectrogram(
                sample_rate=sr,
                n_fft=4410,
                win_length=window_length,
                hop_length=hop_length,
                n_mels=128,
            )(audio_tensor)
            eps = 1e-6
            spec = torch.log(spec + eps)
            spec = np.asarray(
                transforms.Resize((128, 250))(Image.fromarray(spec.numpy()))
            )
            specs.append(spec)

        # Stack spectrograms to create a 3-channel image
        specs = np.stack(specs, axis=0)

        # Normalize the spectrogram
        specs = (specs - specs.mean()) / (specs.std() + 1e-6)

        return specs
    else:
        raise ValueError(f"Unsupported content type: {request_content_type}")


# Define the predict_fn to make predictions
def predict_fn(input_data, model):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.eval()
    with torch.no_grad():
        input_data = torch.tensor(input_data, dtype=torch.float32).to(device)
        output = model(input_data)
        return output


# Define the output_fn to format the predictions
def output_fn(prediction, content_type):
    if content_type == "application/json":
        pred_probabilities = torch.nn.functional.softmax(prediction, dim=1)
        confidences, classes = torch.max(pred_probabilities, 1)
        return {"class": classes.item(), "confidence": confidences.item()}
    else:
        raise ValueError(f"Unsupported content type: {content_type}")
