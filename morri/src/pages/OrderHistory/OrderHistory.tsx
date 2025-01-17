// import React, { useEffect, useState } from 'react';
// import TabBar from '../../component/Tabbar/TabBar';
// import './orderHistory.css';
// import BackgroundOrder from "../../assets/constant/background.jpg";
// import { useAuth } from '../../services/useAuth';

// export interface Product {
//   id: string;
//   name: string;
//   code: string;
//   description: string;
//   sellingPrice: number;
//   imageUrl: string[];
// }

// export interface OrderDetail {
//   id: string;
//   product: Product;
//   quantity: number;
//   unitPrice: number;
//   subtotal: number;
// }

// export interface Customer {
//   id: string;
//   name: string;
//   phoneNumber: string;
// }

// export interface Staff {
//   id: string;
//   name: string;
//   email: string;
// }

// export interface BillBan {
//   id: string;
//   totalPrice: number;
//   status: 'COMPLETED' | 'CANCELLED' | 'ON_DELIVERY';
//   paymentMethod: string | null;
//   customer: Customer;
//   orderDetails: OrderDetail[];
//   staff: Staff;
//   createAt: string;
//   note: string;
// }

// const OrderHistory: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('Tất cả');
//   const [orders, setOrders] = useState<BillBan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   const tabs = ['Tất cả', 'Đang giao', 'Đã giao', 'Đã hủy'];

//   const statusMapping = {
//     'Đang giao': 'ON_DELIVERY',
//     'Đã giao': 'COMPLETED',
//     'Đã hủy': 'CANCELLED'
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [user?.id]);

//   const fetchOrders = async () => {
//     if (!user?.id) return;
    
//     try {
//       const response = await fetch(`http://localhost:8081/billBan/customer/${user.id}`);
//       const data = await response.json();
      
//       // For debugging - log the actual data structure
//       console.log("Fetched orders data:", JSON.stringify(data, null, 2));
      
//       // Ensure data is an array and contains valid order objects
//       if (Array.isArray(data)) {
//         const validOrders = data.filter(order => {
//           // Check if order has the required properties
//           return order && order.id && order.orderDetails;
//         });
//         setOrders(validOrders);
//       } else if (data && typeof data === 'object') {
//         // If single order object
//         setOrders([data]);
//       } else {
//         console.error('Invalid data format received:', data);
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelOrder = async (orderId: string) => {
//     try {
//       const response = await fetch(`http://localhost:8081/billBan/${orderId}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         fetchOrders();
//         alert('Order cancelled successfully');
//       } else {
//         alert('Failed to cancel order');
//       }
//     } catch (error) {
//       console.error('Error cancelling order:', error);
//       alert('Error cancelling order');
//     }
//   };

//   const getFilteredOrders = () => {
//     if (!Array.isArray(orders)) {
//       console.warn('Orders is not an array:', orders);
//       return [];
//     }
    
//     if (activeTab === 'Tất cả') {
//       return orders;
//     }
//     return orders.filter(order => order.status === statusMapping[activeTab as keyof typeof statusMapping]);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleString('vi-VN');
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid Date';
//     }
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   const filteredOrders = getFilteredOrders();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="order-history-root">
//       <div className="order-header" style={{
//         backgroundImage: `url(${BackgroundOrder})`,
//         height: '250px',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative',
//         marginBottom: '50px',
//       }}>
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(255, 255, 255, 0.5)',
//           zIndex: 1,
//         }} />
//         <div style={{
//           position: 'relative',
//           color: 'white',
//           fontSize: '24px',
//           fontWeight: 'bold',
//           zIndex: 2,
//         }}>
//           Đơn hàng
//         </div>
//       </div>

//       <div className="tab-section">
//         <TabBar
//           tabs={tabs}
//           onTabChange={handleTabChange}
//           defaultTab="Tất cả"
//           styleType="custom"
//         />
//       </div>

//       <div className="orderhistory-container">
//         {filteredOrders.length === 0 ? (
//           <div className="no-orders">Không tìm thấy đơn hàng nào</div>
//         ) : (
//           filteredOrders.map((order) => (
//             <div key={order.id} className="orderhistory-card">
//               <div className="orderhistory-details">
//                 {Array.isArray(order.orderDetails) && order.orderDetails.map((detail) => (
//                   <div key={detail.id} className="product-item">
//                     <div className="orderhistory-info">
//                       <h3 className="product-name">{detail.product?.name || 'Unknown Product'}</h3>
//                       <p className="product-type">Code: {detail.product?.code || 'N/A'}</p>
//                       <p className="quantity">x{detail.quantity || 0}</p>
//                     </div>
//                     <div className="price-info">
//                       <p className="price">{(detail.subtotal || 0).toLocaleString('vi-VN')}đ</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="order-footer">
//                   <p>Ngày đặt: {formatDate(order.createAt)}</p>
//                   <p>Trạng thái: {order.status}</p>
//                   {order.status === 'ON_DELIVERY' && (
//                     <button 
//                       className="cancel-button"
//                       onClick={() => handleCancelOrder(order.id)}
//                     >
//                       Hủy đơn
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="orderhistory-summary">
//         <div className="total">
//           Tổng giá trị: {filteredOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0).toLocaleString('vi-VN')}đ
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;
import React, { useEffect, useState } from 'react';
import TabBar from '../../component/Tabbar/TabBar';
import './orderHistory.css';
import BackgroundOrder from "../../assets/constant/background.jpg";
import { useAuth } from '../../services/useAuth';

export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  sellingPrice: number;
  imageUrl: string[];
}

export interface OrderDetail {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
}

export interface BillBan {
  id: string;
  totalPrice: number;
  status: 'COMPLETED' | 'CANCELLED' | 'ON_DELIVERY';
  paymentMethod: string | null;
  customer: Customer;
  orderDetails: OrderDetail[];
  staff: Staff;
  createAt: string;
  note: string;
}

const OrderHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [orders, setOrders] = useState<BillBan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const tabs = ['Tất cả', 'Đang giao', 'Đã giao', 'Đã hủy'];

  const statusMapping = {
    'Đang giao': 'ON_DELIVERY',
    'Đã giao': 'COMPLETED',
    'Đã hủy': 'CANCELLED'
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  const fetchOrders = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`http://localhost:8081/billBan/customer/${user.id}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const validOrders = data.filter(order => {
          return order && order.id && order.orderDetails;
        });
        setOrders(validOrders);
      } else if (data && typeof data === 'object') {
        setOrders([data]);
      } else {
        console.error('Invalid data format received:', data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');
      
      if (!isConfirmed) {
        return;
      }
    console.log(`http://localhost:8081/billBan/cancel/${orderId}`)
      const response = await fetch(`http://localhost:8081/billBan/cancel/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("response order history :"+ JSON.stringify(response));

      if (response.ok) {
        // Show success message
        alert('Đơn hàng đã được hủy thành công');
        // Refresh the orders list
        await fetchOrders();
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || 'Không thể hủy đơn hàng. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Đã xảy ra lỗi khi hủy đơn hàng. Vui lòng thử lại sau.');
    }
  };

  const getFilteredOrders = () => {
    if (!Array.isArray(orders)) {
      console.warn('Orders is not an array:', orders);
      return [];
    }
    
    if (activeTab === 'Tất cả') {
      return orders;
    }
    return orders.filter(order => order.status === statusMapping[activeTab as keyof typeof statusMapping]);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('vi-VN');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredOrders = getFilteredOrders();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-history-root">
      <div className="order-header" style={{
        backgroundImage: `url(${BackgroundOrder})`,
        height: '250px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '50px',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'relative',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 2,
        }}>
          Đơn hàng
        </div>
      </div>

      <div className="tab-section">
        <TabBar
          tabs={tabs}
          onTabChange={handleTabChange}
          defaultTab="Tất cả"
          styleType="custom"
        />
      </div>

      <div className="orderhistory-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">Không tìm thấy đơn hàng nào</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="orderhistory-card">
              <div className="orderhistory-details">
                {Array.isArray(order.orderDetails) && order.orderDetails.map((detail) => (
                  <div key={detail.id} className="product-item">
                    <div className="orderhistory-info">
                      <h3 className="product-name">{detail.product?.name || 'Unknown Product'}</h3>
                      <p className="product-type">Code: {detail.product?.code || 'N/A'}</p>
                      <p className="quantity">x{detail.quantity || 0}</p>
                    </div>
                    <div className="price-info">
                      <p className="price">{(detail.subtotal || 0).toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
                <div className="order-footer">
                  <p>Ngày đặt: {formatDate(order.createAt)}</p>
                  <p>Trạng thái: {
                    order.status === 'ON_DELIVERY' ? 'Đang giao' :
                    order.status === 'COMPLETED' ? 'Đã giao' :
                    order.status === 'CANCELLED' ? 'Đã hủy' : order.status
                  }</p>
                  {order.status === 'ON_DELIVERY' && (
                    <button 
                      className="cancel-button"
                      onClick={() =>{console.log(order); handleCancelOrder(order.id) ;}  }
                    >
                      Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="orderhistory-summary">
        <div className="total">
          Tổng giá trị: {filteredOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0).toLocaleString('vi-VN')}đ
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;