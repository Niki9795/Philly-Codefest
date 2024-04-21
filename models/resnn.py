import pandas as pd
import os
import librosa
import yaml
import torch

dir_fsc22 = "../data/fsc22"
data_dir = os.path.join(dir_fsc22, "audio")
sample_rate = 44100
segment_length = 5
n_fft = 4410
n_mels = 128
n_mfcc = 20
denoise = False


def get_cuda_device():

    # Check if GPUs are available
    if torch.cuda.is_available():
        # Set the default device to GPU
        torch.cuda.set_device(0)  # Specify the GPU device index if using multiple GPUs
        device = torch.device("cuda")
    else:
        # Set the default device to CPU
        # torch.set_default_tensor_type('torch.FloatTensor')
        device = torch.device("cpu")

    return device


import librosa
import argparse
import pandas as pd
import numpy as np
import pickle as pkl
import torch
import torchaudio
import torchvision
from PIL import Image


def extract_spectrogram(values, clip, entries):
    for data in entries:

        num_channels = 3
        window_sizes = [25, 50, 100]
        hop_sizes = [10, 25, 50]
        centre_sec = 2.5

        specs = []
        for i in range(num_channels):
            window_length = int(round(window_sizes[i] * sample_rate / 1000))
            hop_length = int(round(hop_sizes[i] * sample_rate / 1000))

            clip = torch.Tensor(clip)
            spec = torchaudio.transforms.MelSpectrogram(
                sample_rate=sample_rate,
                n_fft=4410,
                win_length=window_length,
                hop_length=hop_length,
                n_mels=128,
            )(clip)
            eps = 1e-6
            spec = spec.numpy()
            spec = np.log(spec + eps)
            spec = np.asarray(
                torchvision.transforms.Resize((128, 250))(Image.fromarray(spec))
            )
            specs.append(spec)
        new_entry = {}
        new_entry["audio"] = clip.numpy()
        new_entry["values"] = np.array(specs)
        new_entry["target"] = data["target"]
        values.append(new_entry)


def extract_features(audios):
    audio_names = list(audios.filename.unique())
    values = []
    for audio in audio_names:
        clip, sr = librosa.load(os.path.join(data_dir, audio), sr=sample_rate)
        entries = audios.loc[audios["filename"] == audio].to_dict(orient="records")
        extract_spectrogram(values, clip, entries)
        print("Finished audio {}".format(audio))
    return values


import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms
from torch.utils.data import DataLoader, Dataset
from torchvision.models import ResNet34_Weights

# Assuming the extract_features function has been run and 'values' is available


# Define a custom dataset
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
