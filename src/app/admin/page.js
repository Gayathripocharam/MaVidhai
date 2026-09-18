"use client";

import Link from "next/link";
import {
  Package,
  Tags,
  Warehouse,
  ShoppingCart,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "2",
    description: "Products currently added",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "24",
    description: "Sample dashboard data",
    icon: ShoppingCart,
  },
  {
    title: "Low Stock",
    value: "3",
    description: "Needs attention",
    icon: AlertTriangle,
  },
  {
    title: "Pending Orders",
    value: "5",
    description: "Awaiting processing",
    icon: Clock3,
  },
];

const recentOrders = [
  {
    id: "#MV001",
    customer: "Priya Sharma",
    product: "Handwoven Cotton Saree",
    amount: "₹999",
    status: "Pending",
  },
  {
    id: "#MV002",
    customer: "Rahul Kumar",
    product: "Lion Face Rope Basket",
    amount: "₹299",
    status: "Confirmed",
  },
  {
    id: "#MV003",
    customer: "Ananya Rao",
    product: "Handwoven Cotton Saree",
    amount: "₹999",
    status: "Processing",
  },
];

function StatusBadge({ status }) {
  const statusStyles = {
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#1D1D1B]">

      {/* Desktop Header */}
      <header className="hidden items-center justify-between border-b border-[#E5E0D8] bg-white px-8 py-5 lg:flex">
        <div>
          <h2 className="text-2xl font-semibold">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-[#77736D]">
            Manage your MaVidhai store
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A227] font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-semibold">
              Admin
            </p>

            <p className="text-xs text-[#77736D]">
              Super Administrator
            </p>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-5 sm:p-6 lg:p-8">

        {/* Welcome */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A85838]">
            Overview
          </p>

          <h3 className="text-2xl font-semibold sm:text-3xl">
            Welcome back, Admin
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#77736D]">
            Here's an overview of what's happening
            with your MaVidhai store.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#77736D]">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      {stat.value}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2E7C2] text-[#A85838]">
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-4 text-xs text-[#99948C]">
                  {stat.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 xl:grid-cols-3">

          {/* Recent Orders */}
          <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white xl:col-span-2">

            <div className="flex items-center justify-between border-b border-[#EEE9E2] px-5 py-5 sm:px-6">
              <div>
                <h4 className="font-semibold">
                  Recent Orders
                </h4>

                <p className="mt-1 text-xs text-[#99948C]">
                  Latest store activity
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-sm font-medium text-[#A85838] hover:underline"
              >
                View all
              </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF8F3] text-xs uppercase tracking-wide text-[#77736D]">
                  <tr>
                    <th className="px-6 py-4 font-medium">
                      Order
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Amount
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-[#F0ECE6]"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-[#99948C]">
                          {order.product}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-[#55514B]">
                        {order.customer}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {order.amount}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Orders */}
            <div className="divide-y divide-[#F0ECE6] md:hidden">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="space-y-3 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {order.id}
                    </p>

                    <StatusBadge status={order.status} />
                  </div>

                  <div>
                    <p className="text-sm text-[#55514B]">
                      {order.customer}
                    </p>

                    <p className="mt-1 text-xs text-[#99948C]">
                      {order.product}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {order.amount}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6">

            <h4 className="font-semibold">
              Quick Actions
            </h4>

            <p className="mt-1 text-xs text-[#99948C]">
              Manage your store
            </p>

            <div className="mt-5 space-y-3">

              <Link
                href="/admin/products"
                className="flex items-center gap-4 rounded-xl border border-[#E8E2D9] p-4 transition hover:border-[#C9A227] hover:bg-[#FAF8F3]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2E7C2] text-[#A85838]">
                  <Package size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Manage Products
                  </p>

                  <p className="mt-1 text-xs text-[#99948C]">
                    Add, edit or deactivate
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center gap-4 rounded-xl border border-[#E8E2D9] p-4 transition hover:border-[#C9A227] hover:bg-[#FAF8F3]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2E7C2] text-[#A85838]">
                  <Tags size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Manage Categories
                  </p>

                  <p className="mt-1 text-xs text-[#99948C]">
                    Organize store collections
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/inventory"
                className="flex items-center gap-4 rounded-xl border border-[#E8E2D9] p-4 transition hover:border-[#C9A227] hover:bg-[#FAF8F3]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2E7C2] text-[#A85838]">
                  <Warehouse size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Check Inventory
                  </p>

                  <p className="mt-1 text-xs text-[#99948C]">
                    Review stock levels
                  </p>
                </div>
              </Link>

            </div>
          </div>

        </div>

        {/* Store Categories */}
        <div className="mt-6 rounded-2xl border border-[#E8E2D9] bg-white p-6">

          <div className="mb-5">
            <h4 className="font-semibold">
              Store Categories
            </h4>

            <p className="mt-1 text-xs text-[#99948C]">
              Current MaVidhai collections
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-[#F8F6F2] p-5">
              <p className="text-sm font-semibold">
                Clothing
              </p>

              <p className="mt-1 text-xs text-[#77736D]">
                Sarees and clothing products
              </p>
            </div>

            <div className="rounded-xl bg-[#F8F6F2] p-5">
              <p className="text-sm font-semibold">
                Home & Living
              </p>

              <p className="mt-1 text-xs text-[#77736D]">
                Baskets and home products
              </p>
            </div>

            <div className="rounded-xl bg-[#F8F6F2] p-5">
              <p className="text-sm font-semibold">
                Toys
              </p>

              <p className="mt-1 text-xs text-[#77736D]">
                Wooden toys and more
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}