"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  X,
  PackageCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  Truck,
  AlertCircle,
} from "lucide-react";

const INITIAL_ORDERS = [
  {
    id: "#MV001",
    customer: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Flat 402, Lotus Residency, MG Road, Bengaluru, KA - 560001",
    product: "Handwoven Cotton Saree",
    quantity: 1,
    amount: 999,
    date: "2026-03-29",
    status: "Pending",
  },
  {
    id: "#MV002",
    customer: "Rahul Kumar",
    email: "rahul.k@example.com",
    phone: "+91 91234 56789",
    address: "Plot 12, Green Hills Layout, Jubilee Hills, Hyderabad, TS - 500033",
    product: "Lion Face Rope Basket",
    quantity: 1,
    amount: 299,
    date: "2026-03-28",
    status: "Confirmed",
  },
  {
    id: "#MV003",
    customer: "Ananya Rao",
    email: "ananya.rao@example.com",
    phone: "+91 99887 76655",
    address: "3B, Skyline Towers, Anna Nagar, Chennai, TN - 600040",
    product: "Handwoven Cotton Saree",
    quantity: 1,
    amount: 999,
    date: "2026-03-27",
    status: "Processing",
  },
];

const ORDER_STATUSES = ["All", "Pending", "Confirmed", "Processing", "Delivered", "Cancelled"];

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Processing: "bg-blue-50 text-blue-700",
    Delivered: "bg-purple-50 text-purple-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#1D1D1B]">
      {/* Header */}
      <header className="border-b border-[#E5E0D8] bg-white px-6 py-5 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold">Orders Management</h1>
          <p className="mt-1 text-sm text-[#77736D]">
            Track, process, and update customer order fulfillment
          </p>
        </div>
      </header>

      <div className="p-5 sm:p-6 lg:p-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99948C]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Order ID, customer, or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E8E2D9] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {ORDER_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedStatus === status
                    ? "bg-[#C9A227] text-white"
                    : "bg-white text-[#77736D] border border-[#E8E2D9] hover:bg-[#FAF8F3]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white shadow-sm">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle size={40} className="text-[#99948C] mb-3" />
              <h3 className="text-base font-semibold">No orders found</h3>
              <p className="mt-1 text-sm text-[#77736D]">
                Try adjusting your search terms or filter selection.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF8F3] text-xs uppercase tracking-wide text-[#77736D] border-b border-[#EEE9E2]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Product / Units</th>
                    <th className="px-6 py-4 font-medium">Total</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE6]">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF8F3]/50">
                      <td className="px-6 py-4 font-medium text-[#1D1D1B]">
                        {order.id}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-[#1D1D1B]">{order.customer}</p>
                        <p className="text-xs text-[#99948C]">{order.email}</p>
                      </td>

                      <td className="px-6 py-4 text-[#55514B]">
                        <p className="font-medium">{order.product}</p>
                        <p className="text-xs text-[#99948C]">Qty: {order.quantity}</p>
                      </td>

                      <td className="px-6 py-4 font-semibold text-[#1D1D1B]">
                        ₹{order.amount}
                      </td>

                      <td className="px-6 py-4 text-xs text-[#77736D]">
                        {order.date}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="rounded-lg border border-[#E8E2D9] bg-white px-2.5 py-1 text-xs font-medium outline-none focus:border-[#C9A227]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="inline-flex items-center gap-1 rounded-lg p-2 text-[#77736D] hover:bg-[#F2E7C2] hover:text-[#A85838] transition"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-[#E8E2D9]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEE9E2]">
              <div>
                <h2 className="text-lg font-semibold">Order Details</h2>
                <p className="text-xs text-[#99948C]">{viewingOrder.id} • Placed on {viewingOrder.date}</p>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="text-[#99948C] hover:text-[#1D1D1B]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#55514B] uppercase tracking-wider">Current Status</span>
                <StatusBadge status={viewingOrder.status} />
              </div>

              <div className="rounded-xl bg-[#F8F6F2] p-4 space-y-2">
                <p className="text-xs font-semibold text-[#77736D] uppercase tracking-wider">Customer Details</p>
                <p className="font-medium text-[#1D1D1B]">{viewingOrder.customer}</p>
                <p className="text-xs text-[#55514B]">Email: {viewingOrder.email}</p>
                <p className="text-xs text-[#55514B]">Phone: {viewingOrder.phone}</p>
                <p className="text-xs text-[#55514B] pt-1">
                  <strong>Shipping Address:</strong> {viewingOrder.address}
                </p>
              </div>

              <div className="rounded-xl border border-[#E8E2D9] p-4">
                <p className="text-xs font-semibold text-[#77736D] uppercase tracking-wider mb-2">Order Items</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{viewingOrder.product}</p>
                    <p className="text-xs text-[#99948C]">Quantity: {viewingOrder.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{viewingOrder.amount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#77736D]">Total Paid Amount</span>
                <span className="text-lg font-bold text-[#1D1D1B]">₹{viewingOrder.amount}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-[#EEE9E2] pt-4">
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="rounded-xl bg-[#A85838] px-5 py-2 text-sm font-medium text-white hover:bg-[#8f4a2e]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}