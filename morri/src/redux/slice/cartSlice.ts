import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

export interface AddCartItem {
  productId: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// cartSlice.ts

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const loadCartFromLocalStorage = (): CartState => {
  const cartData = localStorage.getItem("cartItems");

  if (cartData) {
    return {
      items: JSON.parse(cartData), // Chuyển đổi chuỗi JSON thành mảng
      loading: false,
      error: null,
    };
  }

  return { items: [], loading: false, error: null };
};
// Thunks
// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (customerId: string) => {
//     const response = await axios.get(`http://localhost:8081/cart/${customerId}/items`);
//     return response.data;
//   }
// );

// export const updateQuantity = createAsyncThunk(
//   'cart/updateQuantity',
//   async ({ customerId, itemId, quantity }: { customerId: string; itemId: number; quantity: number }) => {
//     const response = await axios.put(`http://localhost:8081/cart/${customerId}/items/${itemId}`, {
//       quantity
//     });
//     return response.data;
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   'cart/removeFromCart',
//   async ({ customerId, itemId }: { customerId: string; itemId: number }) => {
//     await axios.delete(`http://localhost:8081/cart/${customerId}/items/${itemId}`);
//     return itemId;
//   }
// );

// export const addCart = createAsyncThunk(
//   'cart/addCart',
//   async ({ customerId, items }: { customerId: string; items: AddCartItem[] }) => {
//     const response = await axios.post(`http://localhost:8081/cart/${customerId}/items`, {
//       items: items
//     });
//     return response.data;
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    selectAllItems: (state) => {
      state.items = state.items.map((item) => ({
        ...item,
        selected: true,
      }));
    },
    clearSelectedItems: (state) => {
      state.items = state.items.map((item) => ({
        ...item,
        selected: false,
      }));
    },
    setSelectedItems: (state, action) => {
      const { id, selected } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.selected = selected;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
    addToCart: (state, action) => {
      state.loading = false;

      // If the response is a single item, find and update or add it
      const newItem = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push(newItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  selectAllItems,
  clearSelectedItems,
  setSelectedItems,
  clearCart,
  addToCart,
  updateQuantity,
  removeItem
} = cartSlice.actions;

export default cartSlice.reducer;
