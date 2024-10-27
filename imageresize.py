import os
import subprocess
import tkinter as tk
from tkinter import filedialog

def resize_image(file_path, output_path, width, height):
    """Resize a single image."""
    command = [
        'convert', file_path,
        '-resize', f'{width}x{height}!',
        '-quality', '100',  # Ensure no quality loss
        output_path  # Save to new location
    ]
    subprocess.run(command, check=True)
    print(f"Resized {os.path.basename(file_path)} to {width}x{height} without quality loss and saved to {output_path}")

def resize_images(directory, width, height):
    """Resize all images in the specified directory."""
    resized_directory = os.path.join(directory, "resized")
    os.makedirs(resized_directory, exist_ok=True)

    # Loop through all files in the directory
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
            file_path = os.path.join(directory, filename)
            output_path = os.path.join(resized_directory, filename)
            resize_image(file_path, output_path, width, height)

if __name__ == "__main__":
    # Create a Tkinter root window (hidden)
    root = tk.Tk()
    root.withdraw()  # Hide the root window

    # Ask the user if they want to resize a single image or all images in a directory
    choice = input("Do you want to resize a single image (s) or all images in a directory (d)? (s/d): ").strip().lower()

    if choice == 's':
        # Open a dialog to select a single image file
        file_path = filedialog.askopenfilename(
            title="Select an Image to Resize", 
            filetypes=[("Image Files", "*.png;*.jpg;*.jpeg;*.gif;*.bmp;*.tiff")]
        )
        if not file_path:
            print("No file selected. Exiting...")
            exit()
        
        # Ask for width and height
        width = input("Enter the target width: ")
        height = input("Enter the target height: ")
        
        # Set output path for the resized image
        output_path = os.path.splitext(file_path)[0] + "_resized" + os.path.splitext(file_path)[1]

        # Resize the single image
        try:
            resize_image(file_path, output_path, width, height)
            print("Image resized successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")

    elif choice == 'd':
        # Open a dialog to select the directory
        directory = filedialog.askdirectory(title="Select the Directory Containing Images")
        if not directory:
            print("No directory selected. Exiting...")
            exit()

        # Ask for width and height
        width = input("Enter the target width: ")
        height = input("Enter the target height: ")
        
        # Run the resizing function
        try:
            resize_images(directory, width, height)
            print("All images have been resized successfully and saved in the 'resized' folder.")
        except Exception as e:
            print(f"An error occurred: {e}")

    else:
        print("Invalid choice. Please enter 's' for single image or 'd' for directory.")
