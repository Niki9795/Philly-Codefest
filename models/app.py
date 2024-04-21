import os
import time
import main


def func():
    # Replace with your function's code
    main.main()
    # Add your processing code here


input_directory = "../input"

while True:
    # List all files in the input directory
    files = [
        f
        for f in os.listdir(input_directory)
        if os.path.isfile(os.path.join(input_directory, f))
    ]

    for file in files:
        file_path = os.path.join(input_directory, file)
        func()  # Call the function with the file path
        os.remove(file_path)  # Delete the file after processing

    time.sleep(3)  # Sleep for a second to avoid high CPU usage
