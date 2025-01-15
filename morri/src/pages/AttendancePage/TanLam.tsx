import React, { useEffect, useRef, useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import { Box, CircularProgress, Alert, Avatar } from "@mui/material";
import XinVangModal from "./XinVangModal";
import * as faceapi from "face-api.js";
import { useAuth } from "../../services/useAuth";

interface XinVangProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleXinVang: () => Promise<void>;
}

const TanLam: React.FC<XinVangProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleXinVang,
}) => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const [attendanceStatus, setAttendanceStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatchScore, setFaceMatchScore] = useState<number | null>(null);
  const [referenceDescriptor, setReferenceDescriptor] =
    useState<Float32Array | null>(null);

  const CONFIDENCE_THRESHOLD = 80;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL =
        "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.load(MODEL_URL),
          faceapi.nets.faceLandmark68Net.load(MODEL_URL),
          faceapi.nets.faceRecognitionNet.load(MODEL_URL),
        ]);
        setModelsLoaded(true);
        await loadReferenceImage();
      } catch (err) {
        setError("Failed to load face detection models");
      }
    };

    loadModels();
    startVideo();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const loadReferenceImage = async () => {
    if (!user?.avaURL) {
      setError("No reference image available");
      return;
    }

    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const img = await faceapi.fetchImage(proxyUrl + user.avaURL);
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        setReferenceDescriptor(detection.descriptor);
      } else {
        setError("No face detected in reference image");
      }
    } catch (err) {
      setError("Failed to load reference image");
    }
  };

  const compareFaces = async (
    descriptor1: Float32Array,
    descriptor2: Float32Array
  ) => {
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
    const similarity = Math.max(0, Math.min(100, (1 - distance) * 100));
    return similarity;
  };

  const detectAndDrawFace = async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) return;

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    const ctx = canvas.getContext("2d");
    if (ctx && detection) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        detection.detection.box.x,
        detection.detection.box.y,
        detection.detection.box.width,
        detection.detection.box.height
      );

      if (referenceDescriptor) {
        const score = await compareFaces(
          detection.descriptor,
          referenceDescriptor
        );
        setFaceMatchScore(score);
      }
    }
  };

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      const interval = setInterval(detectAndDrawFace, 100);
      return () => clearInterval(interval);
    }
  }, [modelsLoaded, referenceDescriptor]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Cannot access camera");
    }
  };

  const handleDiemDanh = async () => {
    setIsProcessing(true);
    try {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current!,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection || !referenceDescriptor) {
        throw new Error("No face detected or reference image not loaded");
      }

      const similarity = await compareFaces(
        detection.descriptor,
        referenceDescriptor
      );

      if (similarity < CONFIDENCE_THRESHOLD) {
        throw new Error("Face verification failed. Please try again.");
      }
      console.log("user id: " + user?.id);
      const response = await fetch(
        "http://localhost:8081/attendance/check-out",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employee: user?.id,
            notes: "Regular check-out",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark attendance");
      }

      setAttendanceStatus("Attendance recorded successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process attendance"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "600px",
          marginTop: "20px",
          margin: "auto",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {faceMatchScore !== null && (
          <Alert
            severity={
              faceMatchScore >= CONFIDENCE_THRESHOLD ? "success" : "warning"
            }
            sx={{ mt: 2 }}
          >
            Face match confidence: {faceMatchScore.toFixed(1)}%
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {attendanceStatus && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {attendanceStatus}
          </Alert>
        )}
      </div>
      <Avatar src={user?.avaURL} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <BtnComponent
          btnColorType="close"
          btnText="Xin vang"
          onClick={() => setIsModalOpen(true)}
        />
        <BtnComponent
          btnColorType="primary"
          btnText={isProcessing ? "Processing..." : "Diem danh"}
          onClick={handleDiemDanh}
          disabled={
            isProcessing ||
            !modelsLoaded ||
            !referenceDescriptor ||
            (faceMatchScore !== null && faceMatchScore < CONFIDENCE_THRESHOLD)
          }
        />
      </Box>

      {isProcessing && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      <XinVangModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleXinVang={handleXinVang}
      />
    </div>
  );
};

export default TanLam;
