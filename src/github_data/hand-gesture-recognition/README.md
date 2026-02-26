# AI Software for Hand Gesture Recognition

## Introduction
Hand gesture recognition is a technology that enables computers to understand human hand signals by combining machine learning and computer vision. This project aims to develop a model that can recognize various hand gestures in real-time.

## Main Components

### 1. Data Collection
Data collection is crucial for training the hand gesture recognition model. The process involves:
- **Video Capture**: Initializing video capture with `cv2.VideoCapture(0)` for continuous frame reading.
- **Hand Detection**: Using `cvzone.HandTrackingModule` to detect hands in each frame.
- **Image Processing**: Cropping and resizing hands to a standardized format for improved visualization.
- **User Interaction**: Saving processed images by pressing the 's' key, with a timestamp for easy data collection.

### 2. Data Storage
All data is organized in a central repository:
- Each labeled folder corresponds to a distinct hand gesture (A-Z).

### 3. Model Training with Teachable Machine
Steps involved in training the model:
- **Data Upload**: Upload labeled hand gesture data to Teachable Machine.
- **Data Preprocessing**: Resize and normalize images for consistency.
- **Data Splitting**: Use an 80-20 split for training and testing.
- **Feature Extraction**: Employ CNNs for feature extraction.
- **Model Training**: Adjust model parameters based on training data.
- **Model Evaluation**: Evaluate with accuracy, precision, recall, and F1 score.
- **Model Refinement**: Adjust hyperparameters or collect more data if needed.

### 4. Testing Script
- **Initialization**: Load the pre-trained model (`keras_model.h5`) and labels (`labels.txt`).
- **Image Processing and Classification**: Process frames in real-time and classify hand gestures.
- **User Interaction**: Terminate the script by pressing the 'm' key.

## Usage

### How to Run the Project

#### 1. **Set up your environment**
Ensure you have the necessary libraries installed. You can create a virtual environment and install the required dependencies using `pip`. The key dependencies include:
- `opencv-python` (for video capture and image processing)
- `cvzone` (for hand tracking)
- `tensorflow` (for the model)

To install these dependencies, run the following command:
```bash
pip install opencv-python cvzone tensorflow
```

### 2. Data Collection
- Run the data collection script to capture hand gesture images. This script will use your webcam to collect data and save it as images in a folder named after the gesture.
Press the 's' key to save images of detected hand gestures. Each saved image is timestamped to prevent overwriting.

### 3. Model Training
- Once you have enough data, upload it to **Teachable Machine** (https://teachablemachine.withgoogle.com/).
- Follow the instructions on the website to train your model. After training, export the model as a `.h5` file (e.g., `keras_model.h5`).
- Make sure the exported model and the `labels.txt` file (which contains the list of gestures) are in the same directory as your testing script.

### 4. Testing the Model
- Run the testing script to classify hand gestures in real-time. The script will load the pre-trained model (`keras_model.h5`) and labels (`labels.txt`).
- The webcam feed will be processed, and the model will predict the hand gesture based on the detected hand.
- To stop the script, press the 'm' key.

## Conclusion
This project integrates data collection, model training, and testing into a cohesive real-time hand gesture recognition tool. Combining OpenCV, `cvzone`, and Teachable Machine ensures a robust and adaptable solution.

## Future Considerations
Potential applications include:
- **Human-Computer Interaction**
- **Sign Language Recognition**
- **Gaming Control**
- **Educational Tools**
