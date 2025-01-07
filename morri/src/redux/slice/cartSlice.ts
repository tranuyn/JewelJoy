import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    error: null
  };
  
  // Thunks
  export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (customerId: string) => {
      const response = await axios.get(`http://localhost:8081/cart/${customerId}/items`);
      return response.data;
    }
  );
  
  export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ customerId, itemId, quantity }: { customerId: string; itemId: number; quantity: number }) => {
      const response = await axios.put(`http://localhost:8081/cart/${customerId}/items/${itemId}`, {
        quantity
      });
      return response.data;
    }
  );
  
  export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ customerId, itemId }: { customerId: string; itemId: number }) => {
      await axios.delete(`http://localhost:8081/cart/${customerId}/items/${itemId}`);
      return itemId;
    }
  );
  
  export const addCart = createAsyncThunk(
    'cart/addCart',
    async ({ customerId, items }: { customerId: string; items: AddCartItem[] }) => {
      const response = await axios.post(`http://localhost:8081/cart/${customerId}/items`, {
        items: items
      });
      return response.data;
    }
  );
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      selectAllItems: (state) => {
        state.items = state.items.map(item => ({
          ...item,
          selected: true
        }));
      },
      clearSelectedItems: (state) => {
        state.items = state.items.map(item => ({
          ...item,
          selected: false
        }));
      },
      setSelectedItems: (state, action) => {
        const { itemId, selected } = action.payload;
        const item = state.items.find(item => item.id === itemId);
        if (item) {
          item.selected = selected;
        }
      },
      clearCart: (state) => {
        state.items = [];
        state.error = null;
      }
    },
    // extraReducers: (builder) => {
    //   // Fetch Cart
    //   builder.addCase(fetchCart.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   });
    //   builder.addCase(fetchCart.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.items = action.payload;
    //   });
    //   builder.addCase(fetchCart.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'Failed to fetch cart';
    //   });
  
    //   // Update Quantity
    //   builder.addCase(updateQuantity.fulfilled, (state, action) => {
    //     const updatedItem = action.payload;
    //     const index = state.items.findIndex(item => item.id === updatedItem.id);
    //     if (index !== -1) {
    //       state.items[index] = updatedItem;
    //     }
    //   });
  
    //   // Remove Item
    //   builder.addCase(removeFromCart.fulfilled, (state, action) => {
    //     state.items = state.items.filter(item => item.id !== action.payload);
    //   });
  
    //   // Add Cart Items
    //   builder.addCase(addCart.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   });
    //   builder.addCase(addCart.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.items = action.payload;  // Assuming the API returns the updated cart
    //   });
    //   builder.addCase(addCart.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'Failed to add items to cart';
    //   });
    // }
  });
  
  export const {
    selectAllItems,
    clearSelectedItems,
    setSelectedItems,
    clearCart
  } = cartSlice.actions;
  
  export default cartSlice.reducer;