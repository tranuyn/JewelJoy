export interface CartItem {
    id: number;
    name: string;
    type: string;
    price: number;
    quantity: number;
    image: string;
    selected?: boolean;
  }
  
  export interface OrderSummary {
    items: number;
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
  }