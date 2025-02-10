import React, { useState, useRef, useEffect } from "react";
import "./CameraModal.css";
import { IoClose, IoCamera, IoVideocam, IoStopCircle } from "react-icons/io5";

const CameraModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true, // Enable audio
        });
        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        // Handle the error gracefully (e.g., display an error message)
      }
    };

    getCameraStream();

    return () => {
      // Cleanup: Stop the camera stream when the component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop(); // Stop recorder on unmount if still recording
      }
    };
  }, []);

  const takePicture = () => {
    if (!stream || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png"); // Get the data URL
    console.log("Image URL:", imageUrl); // You can now display this image
    // You can send imageUrl to parent component
  };

  const startRecording = () => {
    if (!stream) return;
    setRecordedChunks([]); // Clear previous recordings
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(blob);
      console.log("Video URL:", videoUrl); // Display the video
      // You can send videoUrl to parent component
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="camera-modal">
      <div className="camera-modal-content">
        <div className="camera-header">
          <button className="close-button" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <video ref={videoRef} autoPlay className="camera-preview" />
        <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
        {/* Hidden canvas */}
        <div className="camera-controls">
          <button onClick={takePicture}>
            <IoCamera />
          </button>
          {recording ? (
            <button onClick={stopRecording} className="recording">
              <IoStopCircle />{" "}
            </button>
          ) : (
            <button onClick={startRecording}>
              <IoVideocam />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
