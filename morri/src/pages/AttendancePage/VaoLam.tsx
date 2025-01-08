// import React, { useEffect, useRef, useState } from "react";
// import BtnComponent from "../../component/BtnComponent/BtnComponent";
// import { Box, CircularProgress, Alert } from "@mui/material";
// import XinVangModal from "./XinVangModal";
// import axios from "axios";
// import { useAuth } from "../../services/useAuth";
// import * as faceapi from "face-api.js";

// interface XinVangProps {
//   isModalOpen: boolean;
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   handleXinVang: () => Promise<void>;
// }

// const VaoLam: React.FC<XinVangProps> = ({
//   isModalOpen,
//   setIsModalOpen,
//   handleXinVang,
// }) => {
//   const { user } = useAuth();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [error, setError] = useState<string>("");
//   const [attendanceStatus, setAttendanceStatus] = useState<string>("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [modelsLoaded, setModelsLoaded] = useState(false);

//   useEffect(() => {
//     const loadModelsFromCDN = async () => {
//       const MODEL_URL =
//         "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";
//       try {
//         setError("Loading face detection models...");
//         console.log("Starting to load models from:", MODEL_URL);

//         await faceapi.nets.tinyFaceDetector.load(MODEL_URL);
//         console.log("Loaded tinyFaceDetector");

//         await faceapi.nets.faceLandmark68Net.load(MODEL_URL);
//         console.log("Loaded faceLandmark68Net");

//         await faceapi.nets.faceRecognitionNet.load(MODEL_URL);
//         console.log("Loaded faceRecognitionNet");

//         await faceapi.nets.ssdMobilenetv1.load(MODEL_URL);
//         console.log("Loaded ssdMobilenetv1");

//         setModelsLoaded(true);
//         setError("");
//         console.log("All models loaded successfully");
//       } catch (err) {
//         console.error("Error loading models:", err);
//         setError(
//           `Failed to load face detection models: ${
//             err instanceof Error ? err.message : "Unknown error"
//           }`
//         );
//       }
//     };

//     loadModelsFromCDN();
//     startVideo();

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (modelsLoaded && videoRef.current) {
//       const interval = setInterval(detectAndDrawFace, 100);
//       return () => clearInterval(interval);
//     }
//   }, [modelsLoaded]);

//   const startVideo = async () => {
//     try {
//       const constraints = {
//         video: {
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: "user",
//         },
//       };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       setError("Cannot access camera");
//     }
//   };

//   const detectAndDrawFace = async () => {
//     if (!videoRef.current || !canvasRef.current || !modelsLoaded) return;

//     // Match canvas dimensions to video
//     const videoEl = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = videoEl.videoWidth;
//     canvas.height = videoEl.videoHeight;

//     // Detect face
//     const options = new faceapi.TinyFaceDetectorOptions({
//       inputSize: 512,
//       scoreThreshold: 0.5,
//     });

//     const detection = await faceapi.detectSingleFace(videoEl, options);

//     // Draw results
//     const ctx = canvas.getContext("2d");
//     if (ctx) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (detection) {
//         // Draw rectangle
//         ctx.strokeStyle = "#00ff00";
//         ctx.lineWidth = 2;
//         ctx.strokeRect(
//           detection.box.x,
//           detection.box.y,
//           detection.box.width,
//           detection.box.height
//         );

//         // Optional: Add label
//         ctx.fillStyle = "#00ff00";
//         ctx.font = "16px Arial";
//         ctx.fillText("Face Detected", detection.box.x, detection.box.y - 5);
//       }
//     }
//   };

//   const detectFace = async (image: HTMLVideoElement | HTMLImageElement) => {
//     const options = new faceapi.TinyFaceDetectorOptions({
//       inputSize: 512,
//       scoreThreshold: 0.5,
//     });

//     const detection = await faceapi
//       .detectSingleFace(image, options)
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     return detection;
//   };

//   const compareUserFace = async () => {
//     if (!videoRef.current || !user?.avaURL || !modelsLoaded) {
//       throw new Error("Video or user image not available");
//     }

//     const samples = 3;
//     const descriptors: Float32Array[] = [];

//     for (let i = 0; i < samples; i++) {
//       const liveFaceDetection = await detectFace(videoRef.current);

//       if (!liveFaceDetection) {
//         throw new Error(
//           "No face detected in camera. Please center your face and ensure good lighting"
//         );
//       }

//       descriptors.push(liveFaceDetection.descriptor);
//       await new Promise((resolve) => setTimeout(resolve, 200));
//     }

//     const averageDescriptor = new Float32Array(128);
//     for (let i = 0; i < 128; i++) {
//       averageDescriptor[i] =
//         descriptors.reduce((sum, curr) => sum + curr[i], 0) / samples;
//     }
//     const imageUrl = "https://i.ibb.co/example-image.jpg";
//     const base64 = await imageUrlToBase64(imageUrl);
//     const storedImage = await faceapi.fetchImage(base64);
//     const storedFaceDetection = await detectFace(storedImage);

//     if (!storedFaceDetection) {
//       throw new Error("No face detected in stored profile image");
//     }

//     const distance = faceapi.euclideanDistance(
//       averageDescriptor,
//       storedFaceDetection.descriptor
//     );

//     return { isMatch: distance < 0.45, confidence: 1 - distance };
//   };
//   const imageUrlToBase64 = async (url: string): Promise<string> => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch image. Status: ${response.status}`);
//       }
//       const blob = await response.blob();
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result as string);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error("Error converting image to Base64:", error);
//       throw error;
//     }
//   };

//   const handleDiemDanh = async () => {
//     setIsProcessing(true);
//     setError("");
//     try {
//       const { isMatch, confidence } = await compareUserFace();
//       if (!isMatch) {
//         throw new Error(
//           `Face verification failed (Confidence: ${(confidence * 100).toFixed(
//             2
//           )}%)`
//         );
//       }

//       setAttendanceStatus(
//         `Attendance recorded successfully (Confidence: ${(
//           confidence * 100
//         ).toFixed(2)}%)`
//       );
//       const response = await fetch(
//         "http://localhost:8081/attendance/check-in",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             employee: `${user?.id}`,
//             notes: "Regular check-in",
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to mark attendance");
//       }

//       console.log("Attendance response:", data);
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Failed to process attendance"
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           width: "600px",
//           marginTop: "20px",
//           margin: "auto",
//           position: "relative",
//         }}
//       >
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           style={{ width: "100%", height: "auto", borderRadius: "8px" }}
//         />
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//           }}
//         />

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {attendanceStatus && (
//           <Alert severity="success" sx={{ mt: 2 }}>
//             {attendanceStatus}
//           </Alert>
//         )}
//       </div>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 2,
//           marginTop: "20px",
//         }}
//       >
//         <BtnComponent
//           btnColorType="close"
//           btnText={"Xin vang"}
//           onClick={() => setIsModalOpen(true)}
//         />
//         <BtnComponent
//           btnColorType="primary"
//           btnText={isProcessing ? "Processing..." : "Diem danh"}
//           onClick={handleDiemDanh}
//           disabled={isProcessing || !modelsLoaded}
//         />
//       </Box>

//       {isProcessing && (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <CircularProgress size={24} />
//         </Box>
//       )}

//       <XinVangModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         handleXinVang={handleXinVang}
//       />
//     </div>
//   );
// };

// export default VaoLam;
import React, { useEffect, useRef, useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import { Box, CircularProgress, Alert } from "@mui/material";
import XinVangModal from "./XinVangModal";
import * as faceapi from "face-api.js";
import { useAuth } from "../../services/useAuth";

interface XinVangProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleXinVang: () => Promise<void>;
}

const VaoLam: React.FC<XinVangProps> = ({
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

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      const interval = setInterval(detectAndDrawFace, 100);
      return () => clearInterval(interval);
    }
  }, [modelsLoaded]);

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

  const detectAndDrawFace = async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) return;

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const detection = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    const ctx = canvas.getContext("2d");
    if (ctx && detection) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        detection.box.x,
        detection.box.y,
        detection.box.width,
        detection.box.height
      );
    }
  };

  const handleDiemDanh = async () => {
    setIsProcessing(true);
    try {
      const detection = await faceapi.detectSingleFace(
        videoRef.current!,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (!detection) {
        throw new Error("No face detected");
      }

      const response = await fetch(
        "http://localhost:8081/attendance/check-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employee: user?.id,
            notes: "Regular check-in",
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
          disabled={isProcessing || !modelsLoaded}
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
