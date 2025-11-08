import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Recent Orders</h2>
      <ul>
        {orders.map(o => <li key={o._id}>{o._id} — {o.status} — {o.totalPrice}</li>)}
      </ul>
    </div>
  );
}
