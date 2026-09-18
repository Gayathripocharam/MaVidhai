"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Pink Floral Cotton Saree",
    price: 1499,
    category: "Cotton Sarees",

    // Reusable product media structure
    media: [
      {
        type: "image",
        src: "/sarees/saree-1.png",
      },
      {
        type: "video",
        src: "/sarees/saree-1.mp4",
      },
    ],

    description:
      "A vibrant pink cotton saree featuring beautiful floral prints, delicate tassel detailing, and a subtle golden border. A stylish and comfortable choice for festive and casual occasions.",

    variants: ["Free Size"],
  },

  {
    id: 2,
    name: "Olive Green Lotus Saree",
    price: 1699,
    category: "Handloom Sarees",

    media: [
      {
        type: "image",
        src: "/sarees/saree-2.png",
      },
    ],

    description:
      "A beautiful olive green saree featuring traditional lotus motifs with a contrasting white floral border and elegant tassel detailing. Perfect for a graceful ethnic look.",

    variants: ["Free Size"],
  },

  {
    id: 3,
    name: "White Bird Print Saree",
    price: 1599,
    category: "Cotton Sarees",

    media: [
      {
        type: "image",
        src: "/sarees/saree-3.png",
      },
    ],

    description:
      "An elegant white saree featuring artistic bird prints, black tassel detailing, and a traditional contrasting border. A simple and sophisticated choice for everyday and special occasions.",

    variants: ["Free Size"],
  },

  {
    id: 4,
    name: "Parrot Green Cotton Saree",
    price: 1499,
    category: "Cotton Sarees",

    media: [
      {
        type: "image",
        src: "/sarees/saree-4.png",
      },
    ],

    description:
      "A vibrant parrot green cotton saree featuring colorful parrot motifs and a traditional golden border. A comfortable and eye-catching choice for everyday wear and casual occasions.",

    variants: ["Free Size"],
  },

  {
    id: 5,
    name: "Mustard Floral Saree",
    price: 1599,
    category: "Handloom Sarees",

    media: [
      {
        type: "image",
        src: "/sarees/saree-5.png",
      },
    ],

    description:
      "A warm mustard saree featuring traditional floral motifs, a contrasting border, and matching tassel detailing. An elegant addition to a traditional wardrobe.",

    variants: ["Free Size"],
  },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  const product = products.find((item) => item.id === productId);

  const [selectedSize, setSelectedSize] = useState(
    product?.variants?.[0] || "Free Size"
  );

  const [quantity, setQuantity] = useState(1);

  // Keeps track of which image/video is currently displayed
  const [selectedMedia, setSelectedMedia] = useState(0);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    if (!product) return;

    console.log({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      quantity,
    });

    alert(`${product.name} added to cart!`);
  };

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-[#2B2B2B]">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            Sorry, the product you are looking for does not exist.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-block rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#B8860B]"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  /*
   * Move to previous product media
   */
  const showPreviousMedia = () => {
    setSelectedMedia((current) => {
      if (current === 0) {
        return product.media.length - 1;
      }

      return current - 1;
    });
  };

  /*
   * Move to next product media
   */
  const showNextMedia = () => {
    setSelectedMedia((current) => {
      if (current === product.media.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  const currentMedia = product.media[selectedMedia];

  return (
    <main className="min-h-screen bg-[#FAF8F3] px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-[#C9A227]"
          >
            Home
          </Link>

          {" / "}

          <Link
            href="/shop"
            className="transition hover:text-[#C9A227]"
          >
            Shop
          </Link>

          {" / "}

          <span className="text-gray-700">
            {product.name}
          </span>
        </div>

        {/* Product Details */}
        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2 md:p-10">

          {/* Product Media */}
          <div className="relative flex min-h-[550px] items-center justify-center rounded-xl bg-gray-50 p-6">

            {/* Previous Arrow */}
            {product.media.length > 1 && (
              <button
                type="button"
                onClick={showPreviousMedia}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg"
                aria-label="Previous product media"
              >
                ←
              </button>
            )}

            {/* Current Product Image */}
            {currentMedia.type === "image" && (
              <img
                src={currentMedia.src}
                alt={product.name}
                className="h-auto max-h-[550px] w-full rounded-xl object-contain"
              />
            )}

            {/* Current Product Video */}
            {currentMedia.type === "video" && (
              <video
                key={currentMedia.src}
                controls
                muted
                loop
                playsInline
                poster={product.media[0]?.src}
                className="h-auto max-h-[550px] w-full rounded-xl object-contain"
              >
                <source
                  src={currentMedia.src}
                  type="video/mp4"
                />

                Your browser does not support the video tag.
              </video>
            )}

            {/* Product Video Indicator */}
            {currentMedia.type === "video" && (
              <div className="absolute left-8 top-8 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white shadow-md backdrop-blur-sm">
                ▶ Product Video
              </div>
            )}

            {/* Next Arrow */}
            {product.media.length > 1 && (
              <button
                type="button"
                onClick={showNextMedia}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg"
                aria-label="Next product media"
              >
                →
              </button>
            )}

            {/* Media Indicators */}
            {product.media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                {product.media.map((media, index) => (
                  <button
                    key={`${media.type}-${index}`}
                    type="button"
                    onClick={() => setSelectedMedia(index)}
                    className={`rounded-full transition-all duration-300 ${
                      selectedMedia === index
                        ? "h-3 w-3 bg-[#C9A227]"
                        : "h-2.5 w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={
                      media.type === "video"
                        ? "Show product video"
                        : `Show product image ${index + 1}`
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col">

            {/* Category */}
            <p className="text-sm font-medium uppercase tracking-wide text-[#C9A227]">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 text-3xl font-bold text-[#2B2B2B] md:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-5 text-2xl font-bold text-[#C9A227]">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#2B2B2B]">
                Description
              </h2>

              <p className="mt-2 leading-7 text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Size */}
            <div className="mt-7">
              <h2 className="text-lg font-semibold text-[#2B2B2B]">
                Select Size
              </h2>

              <div className="mt-3 flex flex-wrap gap-3">
                {product.variants.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-5 py-2.5 font-medium transition-all ${
                      selectedSize === size
                        ? "border-[#C9A227] bg-[#C9A227] text-white"
                        : "border-gray-300 text-gray-700 hover:border-[#C9A227] hover:text-[#C9A227]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <h2 className="text-lg font-semibold text-[#2B2B2B]">
                Quantity
              </h2>

              <div className="mt-3 flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="px-4 py-2 text-xl text-gray-700 transition hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="min-w-12 px-4 py-2 text-center font-medium text-gray-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="px-4 py-2 text-xl text-gray-700 transition hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-8 w-full rounded-lg bg-[#C9A227] py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[#B8860B] hover:shadow-lg"
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
