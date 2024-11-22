// scale.ts
export const calculateScale = () => {
  // Kích thước thiết kế gốc
  const originalWidth = 1600;
  const originalHeight = 900;

  // Kích thước hiện tại
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  // Tính toán tỷ lệ
  const scaleWidth = currentWidth / originalWidth;
  const scaleHeight = currentHeight / originalHeight;

  // Chọn tỷ lệ nhỏ hơn để đảm bảo không bị cắt xén
  return Math.min(scaleWidth, scaleHeight);
};

export const applyScale = (originalSize: number, scale: number) => originalSize * scale;
