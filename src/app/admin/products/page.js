"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  AlertCircle,
  X,
  UploadCloud,
} from "lucide-react";

const INITIAL_PRODUCTS = [
  {
    id: "prod_1",
    name: "Handwoven Cotton Saree",
    category: "Clothing",
    price: 999,
    image: "/products/saree-pink-purple-1.jpeg",
    isAvailable: true,
  },
  {
    id: "prod_2",
    name: "Lion Face Rope Basket",
    category: "Home & Living",
    price: 299,
    image: "/products/lion-basket-green.jpeg",
    isAvailable: true,
  },
];

const CATEGORIES = ["All", "Clothing", "Home & Living", "Toys"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Clothing",
    price: "",
    image: "",
    isAvailable: true,
  });

  // Filter Logic
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Clothing",
      price: "",
      image: "/products/saree-pink-purple-1.jpeg",
      isAvailable: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      isAvailable: product.isAvailable,
    });
    setIsModalOpen(true);
  };

  const handleToggleAvailability = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to remove this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Local File Upload Preview
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: Number(formData.price) }
            : p
        )
      );
    } else {
      const newProduct = {
        id: `prod_${Date.now()}`,
        ...formData,
        price: Number(formData.price),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#1D1D1B]">
      {/* Header */}
      <header className="border-b border-[#E5E0D8] bg-white px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="mt-1 text-sm text-[#77736D]">
              Manage catalog, inventory visibility, and pricing
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A85838] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#8f4a2e]"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </header>

      <div className="p-5 sm:p-6 lg:p-8">
        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99948C]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E8E2D9] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[#C9A227] text-white"
                    : "bg-white text-[#77736D] border border-[#E8E2D9] hover:bg-[#FAF8F3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white shadow-sm">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle size={40} className="text-[#99948C] mb-3" />
              <h3 className="text-base font-semibold">No products found</h3>
              <p className="mt-1 text-sm text-[#77736D]">
                Try adjusting your search criteria or create a new product.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF8F3] text-xs uppercase tracking-wide text-[#77736D] border-b border-[#EEE9E2]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Item</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Availability</th>
                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE6]">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF8F3]/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#E8E2D9] bg-[#F8F6F2]">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[#99948C]">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-[#1D1D1B]">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#99948C]">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[#55514B]">
                        {item.category}
                      </td>

                      <td className="px-6 py-4 font-medium">₹{item.price}</td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleAvailability(item.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition ${
                            item.isAvailable
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          {item.isAvailable ? (
                            <>
                              <CheckCircle2 size={13} /> In Stock
                            </>
                          ) : (
                            <>
                              <XCircle size={13} /> Unavailable
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="rounded-lg p-2 text-[#77736D] hover:bg-[#F2E7C2] hover:text-[#A85838] transition"
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item.id)}
                            className="rounded-lg p-2 text-[#77736D] hover:bg-red-50 hover:text-red-600 transition"
                            title="Deactivate / Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-[#E8E2D9]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEE9E2]">
              <h2 className="text-lg font-semibold">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#99948C] hover:text-[#1D1D1B]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#55514B] mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2 text-sm outline-none focus:border-[#C9A227]"
                  placeholder="e.g. Handwoven Cotton Saree"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#55514B] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#E8E2D9] px-3 py-2 text-sm outline-none focus:border-[#C9A227]"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Toys">Toys</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#55514B] mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2 text-sm outline-none focus:border-[#C9A227]"
                    placeholder="999"
                  />
                </div>
              </div>

              {/* Image Uploader & Preview */}
              <div>
                <label className="block text-xs font-semibold text-[#55514B] mb-1">
                  Product Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E8E2D9] bg-[#F8F6F2]">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#99948C]">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#C9A227] bg-[#FAF8F3] px-3 py-2.5 text-xs font-medium text-[#A85838] hover:bg-[#F2E7C2]/40 transition">
                    <UploadCloud size={16} />
                    <span>Upload device image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-[#E8E2D9] px-3.5 py-1.5 text-xs outline-none focus:border-[#C9A227]"
                  placeholder="Or enter path: /products/saree-pink-purple-1.jpeg"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="availability"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isAvailable: e.target.checked })
                  }
                  className="rounded border-[#E8E2D9] accent-[#A85838]"
                />
                <label htmlFor="availability" className="text-sm text-[#55514B]">
                  Mark as In Stock / Active
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE9E2]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-[#E8E2D9] px-4 py-2 text-sm font-medium text-[#77736D] hover:bg-[#FAF8F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#A85838] px-5 py-2 text-sm font-medium text-white hover:bg-[#8f4a2e]"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}