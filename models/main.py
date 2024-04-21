import torch
import inference  # This is the inference.py script you created
import librosa
import json


def convert_to_human(output_data):
    sound_dict = {
        0: "Fire",
        1: "Rain",
        2: "Thunderstorm",
        3: "WaterDrops",
        4: "Wind",
        5: "Silence",
        6: "TreeFalling",
        7: "Helicopter",
        8: "VehicleEngine",
        9: "Axe",
        10: "Chainsaw",
        11: "Generator",
        12: "Handsaw",
        13: "Firework",
        14: "Gunshot",
        15: "WoodChop",
        16: "Whistling",
        17: "Speaking",
        18: "Footsteps",
        19: "Clapping",
        20: "Insect",
        21: "Frog",
        22: "BirdChirping",
        23: "WingFlaping",
        24: "Lion",
        25: "WolfHowl",
        26: "Squirrel",
    }
    return {
        "class": sound_dict[output_data["class"]],
        "confidence": "{:.1%}".format(output_data["confidence"]),
    }


def main():
    audio_path = "../input/input.wav"  # Replace with the path to your audio file
    signal, sr = librosa.load(audio_path, sr=None, mono=True)
    input_json = json.dumps({"signal": signal.tolist(), "sr": sr})
    input_data = inference.input_fn(input_json, "application/json")
    prediction = inference.predict_fn(input_data, model)
    output = inference.output_fn(prediction, "application/json")

    result = convert_to_human(output_data=output)
    import json

    with open("output.json", "w") as f:
        json.dump(r, f)
    return result
