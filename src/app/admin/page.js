"use client";

import Link from "next/link";
import {
  Package,
  Boxes,
  ClipboardList,
  TrendingUp,
  Plus,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "TOTAL PRODUCTS",
      value: "24",
      icon: Package,
      href: "/admin/products",
      trend: "+4 this month",
    },
    {
      label: "TOTAL ORDERS",
      value: "18",
      icon: ClipboardList,
      href: "/admin/orders",
      trend: "+12% vs last month",
    },
    {
      label: "LOW STOCK ITEMS",
      value: "3",
      icon: Boxes,
      href: "/admin/inventory",
      trend: "Requires attention",
      alert: true,
    },
    {
      label: "GROSS REVENUE",
      value: "₹48,250",
      icon: TrendingUp,
      href: "/admin/orders",
      trend: "+8% growth",
    },
  ];

  const recentOrders = [
    { id: "ORD-9401", customer: "Priya Sharma", total: "₹4,299", status: "Delivered", date: "Today" },
    { id: "ORD-9400", customer: "Anand Verma", total: "₹1,850", status: "Processing", date: "Today" },
    { id: "ORD-9399", customer: "Deepika Rao", total: "₹7,500", status: "Shipped", date: "Yesterday" },
    { id: "ORD-9398", customer: "Kavita Nair", total: "₹2,100", status: "Delivered", date: "18 Sep" },
  ];

  const lowStock = [
    { name: "Handwoven Silk Saree (Purple)", stock: 2, threshold: 5 },
    { name: "Terracotta Vase - Large", stock: 1, threshold: 4 },
    { name: "Brass Pooja Bell", stock: 3, threshold: 6 },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
            Store Overview
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            Real-time analytics and management controls for your artisan catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:brightness-105 transition-all"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group block rounded-2xl border border-[#EBE3D0] bg-white p-6 shadow-sm transition-all hover:border-[#B8860B] hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-stone-400">
                  {card.label}
                </span>
                <span
                  className={`rounded-xl p-2.5 ${
                    card.alert
                      ? "bg-amber-100 text-amber-700"
                      : "bg-amber-50 text-[#B8860B] border border-amber-100"
                  }`}
                >
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-black text-stone-900">
                {card.value}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-medium">
                <span className={card.alert ? "text-amber-700 font-semibold" : "text-emerald-700"}>
                  {card.trend}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#B8860B]"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-2xl border border-[#EBE3D0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-stone-900">Recent Orders</h2>
              <p className="text-xs text-stone-500">Latest customer checkouts</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#B8860B] hover:underline"
            >
              View All Orders &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3.5 font-bold text-stone-900">{order.id}</td>
                    <td className="py-3.5 text-stone-700">{order.customer}</td>
                    <td className="py-3.5 font-semibold text-stone-900">{order.total}</td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-stone-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-2xl border border-[#EBE3D0] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={17} className="text-[#B8860B]" />
              <h2 className="text-base font-bold text-stone-900">Low Stock Warning</h2>
            </div>
            <p className="text-xs text-stone-500 mb-5">Items nearing stockout threshold</p>

            <div className="space-y-4">
              {lowStock.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-3.5"
                >
                  <p className="text-xs font-bold text-stone-800 line-clamp-1">{item.name}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
                    <span>Remaining: <strong className="text-[#B8860B]">{item.stock}</strong></span>
                    <span>Min: {item.threshold}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/inventory"
            className="mt-6 block text-center rounded-xl border border-amber-200 bg-amber-50/40 py-2.5 text-xs font-semibold text-[#B8860B] hover:bg-amber-100/50 transition-colors"
          >
            Manage Inventory &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}