import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { removeItem, updateQuantity } from "../../redux/slice/cartSlice";

// Import images

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedItems } from "../../redux/slice/cartSlice";
import { RootState } from "../../redux/store";
import { OrderSummary } from "../CartPage/cartTypes";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [voucher, setVoucher] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  // const handleQuantityChange = (id: number, increment: boolean) => {
  //   // setCartItems(items =>
  //   //   items.map(item =>
  //   //     item.id === id
  //   //       ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
  //   //       : item
  //   //   )
  //   // );
  // };
  const handleQuantityChange = (id: number, increment: boolean) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = increment
      ? item.quantity + 1
      : Math.max(1, item.quantity - 1);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleSelectItem = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    if (item.selected) dispatch(setSelectedItems({ id, selected: false }));
    else dispatch(setSelectedItems({ id, selected: true }));
  };

  const handleDeleteItem = (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?"
    );
    if (confirmDelete) {
      dispatch(removeItem(id));
    }
  };

  const calculateOrderSummary = (): OrderSummary => {
    const selectedItems = cartItems.filter((item) => item.selected);
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items: selectedItems.length,
      subtotal,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: subtotal,
    };
  };

  const summary = calculateOrderSummary();

  const handleBuyNow = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems?.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }
    const quantities = selectedItems.reduce<{ [key: number]: number }>(
      (obj, item) => {
        obj[item.id] = item.quantity;
        return obj;
      },
      {}
    );
    console.log(selectedItems, quantities);
    navigate("/products/checkout", {
      state: {
        selectedProducts: selectedItems,
        quantities: quantities,
      },
    });
  };

  return (
    <Box className="root">
      {/* <AppBar position="static" className="header">
        <Toolbar>
          <img src={morriLogo} alt="Morri" className="logo" />
          <Box className="nav-links">
            <Box className="nav-item">
              <LocationOnIcon />
              <Typography>Cửa hàng</Typography>
            </Box>
            <Box className="nav-item">
              <PhoneIcon />
              <Typography>Hotline: 0939800899</Typography>
            </Box>
            <Box className="nav-item">
              <ListAltIcon />
              <Typography>Đơn hàng</Typography>
            </Box>
            <Box className="nav-item">
              <ShoppingCartIcon />
              <Typography>Giỏ hàng</Typography>
            </Box>
            <Box className="nav-item" onClick={handleProfileClick}>
              <PersonIcon />
              <Typography>Peter</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="profile-menu"
      >
        <MenuItem onClick={handleClose}>
          <AccountCircleIcon className="menu-icon" />
          <Typography>Hồ sơ</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutIcon className="menu-icon" />
          <Typography>Đăng xuất</Typography>
        </MenuItem>
      </Menu> */}

      <Box className="cart-container">
        <Box className="title-section">
          <Box className="background-decoration" />
          <Typography variant="h3" className="cart-title">
            Giỏ hàng
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Table className="cart-table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="right">Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box className="product-cell">
                        <Checkbox
                          checked={item.selected}
                          onChange={() => handleSelectItem(item.id)}
                          className="cart-checkbox"
                        />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="product-image"
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {item.type}
                          </Typography>
                          <Tooltip title="Xóa khỏi giỏ hàng">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteItem(item.id)}
                              className="delete-button"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {(item.price * 1).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Box className="quantity-controls">
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, false)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, true)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* <Box className="voucher-section">
              <TextField
                placeholder="Mã voucher"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                size="small"
              />
              <Button variant="contained" className="apply-button">
                Áp dụng
              </Button>
            </Box> */}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper className="order-summary">
              <Typography variant="h6" className="order-title">
                <strong>Đơn hàng</strong>
              </Typography>
              <Box className="summary-row">
                <Typography>Mặt hàng</Typography>
                <Typography>{summary?.items}</Typography>
              </Box>
              <Box className="summary-row">
                <Typography>Tổng tiền</Typography>
                <Typography>{summary?.subtotal.toFixed(2)}</Typography>
              </Box>
              <Box className="summary-row">
                <Typography>Phí vận chuyển</Typography>
                <Typography>{summary?.shipping.toFixed(2)}</Typography>
              </Box>
              <Box className="summary-row">
                <Typography>Thuế</Typography>
                <Typography>{summary?.tax.toFixed(2)}</Typography>
              </Box>
              <Box className="summary-row">
                <Typography>Giảm giá</Typography>
                <Typography>-{summary?.discount.toFixed(2)}</Typography>
              </Box>
              <Box className="summary-row total">
                <Typography>Tổng</Typography>
                <Typography>{summary?.total.toFixed(2)}</Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                className="checkout-button"
                onClick={handleBuyNow}
              >
                Thanh toán
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CartPage;
