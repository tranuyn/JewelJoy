import React from "react";
import { Modal, TextField, Button } from "@mui/material";
import { Product } from '../pages/InventoryPage/Inventory'
import "../pages/InventoryPage/Inventory.css";

interface EditProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFieldChange: (field: keyof Product, value: string | number) => void;
  updateError: string | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  product,
  onClose,
  onSubmit,
  onFieldChange,
  updateError,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ overflow: "auto" }}
    >
      <div className="edit-modal">
        <h2>Chỉnh sửa sản phẩm</h2>
        {updateError && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {updateError}
          </div>
        )}
        <form onSubmit={onSubmit} className="edit-modal-content">
          <TextField
            fullWidth
            label="Tên sản phẩm"
            value={product?.name || ""}
            onChange={(e) => onFieldChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            label="Mã sản phẩm"
            value={product?.code || ""}
            onChange={(e) => onFieldChange("code", e.target.value)}
          />
          <TextField
            fullWidth
            label="Số lượng"
            type="number"
            value={product?.quantity || ""}
            onChange={(e) => onFieldChange("quantity", parseInt(e.target.value))}
          />
          <TextField
            fullWidth
            label="Chất liệu"
            value={product?.material || ""}
            onChange={(e) => onFieldChange("material", e.target.value)}
          />
          <TextField
            fullWidth
            label="Mô tả"
            multiline
            rows={3}
            value={product?.description || ""}
            onChange={(e) => onFieldChange("description", e.target.value)}
          />
          <TextField
            fullWidth
            label="Giá bán"
            type="number"
            value={product?.sellingPrice || ""}
            onChange={(e) => onFieldChange("sellingPrice", parseInt(e.target.value))}
          />
          <TextField
            fullWidth
            label="Trạng thái"
            value={product?.status === "available" ? "Đang kinh doanh" : "Ngừng kinh doanh"}
            disabled
          />
          <div className="edit-modal-buttons">
            <Button variant="outlined" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" type="submit">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProductModal;