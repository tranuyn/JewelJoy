import React, { useEffect, useRef } from "react";
import XinVangModal from "./XinVangModal";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import { Box, CircularProgress } from "@mui/material";

interface TanLamProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleXinVang: () => Promise<void>;
}
const TanLam: React.FC<TanLamProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleXinVang,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
  return (
    <div>
      <div style={{ width: "600px", marginTop: "20px", margin: "auto" }}>
        <video
          ref={videoRef}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        ></video>
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
          btnText={"Diem danh"}
          onClick={() => {}}
        />
      </Box>
      <XinVangModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleXinVang={handleXinVang}
      />
    </div>
  );
};

export default TanLam;
