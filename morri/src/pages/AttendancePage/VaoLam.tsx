import React, { useEffect, useRef, useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import { Box, CircularProgress, Alert } from "@mui/material";
import XinVangModal from "./XinVangModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAuth } from "../../services/useAuth";

interface XinVangProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleXinVang: () => Promise<void>;
}

interface AttendanceResponse {
  id: string;
  employeeId: string;
  checkIn: string;
  status: "ON_TIME" | "LATE" | "ABSENT";
  workingHours: number;
}

const VaoLam: React.FC<XinVangProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleXinVang,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const TYPE = "IN";

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setError("Could not access camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);
  const captureImage = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current) {
        reject(new Error("Camera not initialized"));
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(videoRef.current, 0, 0);
      console.log("Canvas dimensions:", canvas.width, canvas.height); // Debugging

      canvas.toBlob((blob) => {
        if (blob) {
          console.log("Captured blob size:", blob.size); // Debugging
          resolve(blob);
        } else {
          reject(new Error("Could not capture image"));
        }
      }, "image/jpeg");
    });
  };

  const handleDiemDanh = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      setAttendanceStatus(null);

      const imageBlob = await captureImage();
      console.log("imageBlob: " + imageBlob);
      const imageData = await imageBlob.arrayBuffer();
      console.log("token :");

      const formData = new FormData();
      formData.append("image", imageBlob);
      if (user?.faceId === null) {
        const registerFaceResponse = await axios.post(
          `http://localhost:8080/attendance/register-face?userId=${user.id}`,
          imageData,
          {
            headers: {
              "Content-Type": "application/octet-stream",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM1NjI1MjM3LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzU2NjEyMzd9.Vrbmxev2llngaBH7spi-YvRyx-6bd4YT11zpBFVOwQs`,
            },
          }
        );
        if (!registerFaceResponse.data?.faceId) {
          throw new Error("Face registration failed");
        }
      }

      const response = await axios.post<AttendanceResponse>(
        `http://localhost:8080/attendance/check-in?CHECKTYPE=${TYPE}`,
        imageData,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM1NjI1MjM3LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzU2NjEyMzd9.Vrbmxev2llngaBH7spi-YvRyx-6bd4YT11zpBFVOwQs`,
          },
        }
      );

      setAttendanceStatus(`Check-in successful! `);
    } catch (error) {
      console.error("Check-in error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to process check-in"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div style={{ width: "600px", marginTop: "20px", margin: "auto" }}>
        <video
          ref={videoRef}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: "20px",
        }}
      >
        <BtnComponent
          btnColorType="close"
          btnText={"Xin vang"}
          onClick={() => setIsModalOpen(true)}
        />
        <BtnComponent
          btnColorType="primary"
          btnText={isProcessing ? "Processing..." : "Diem danh"}
          onClick={handleDiemDanh}
          disabled={isProcessing}
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

export default VaoLam;
