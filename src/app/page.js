import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdf8]">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="mx-auto max-w-[1450px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* HERO TEXT */}

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[3px] text-[#c99716]">
              Rooted in tradition
            </p>

            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#29251f] sm:text-5xl lg:text-6xl">
              Crafted by Heritage.
              <br />
              Designed for Tomorrow.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#686159]">
              Discover thoughtfully crafted products inspired by heritage,
              made for modern living.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/shop"
                className="rounded-lg bg-[#d1a11c] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#bd8d0f] hover:shadow-lg"
              >
                Explore Collection
              </Link>

              <Link
                href="/#about"
                className="rounded-lg border border-[#d1a11c] bg-white px-7 py-3.5 text-sm font-medium text-[#a9780d] transition-all duration-300 hover:bg-[#fff8e8]"
              >
                Learn Our Story
              </Link>

            </div>
          </div>


          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-[#ead9b5] bg-[#f3ead8]">
            <Image
              src="/images/hero.png"
              alt="Handcrafted MaVidhai collection"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          CATEGORY SECTION
      ====================================================== */}

      <section
        id="categories"
        className="scroll-mt-24 border-y border-[#eee5d2] bg-white px-6 py-16 lg:px-10"
      >

        <div className="mx-auto max-w-[1300px]">

          <div className="mb-10 text-center">

            <p className="text-xs font-medium uppercase tracking-[3px] text-[#c99716]">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-[#29251f]">
              Shop by Category
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#756d63]">
              From everyday essentials to handcrafted treasures,
              discover products made for every part of life.
            </p>

          </div>


          {/* CATEGORY CARDS */}

          <div className="mx-auto grid max-w-[800px] min-w-0 grid-cols-2 gap-5">

            <CategoryCard
              title="Clothing"
              description="Traditional pieces for today"
              href="/shop?category=clothing"
              image="/products/saree-pink-purple-1.jpeg"
            />

            <CategoryCard
              title="Home & Living"
              description="Thoughtful pieces for your home"
              href="/shop?category=home-living"
              image="/products/lion-basket-green.jpeg"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}

      <section className="mx-auto max-w-[1450px] px-6 py-16 lg:px-10">

        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-xs font-medium uppercase tracking-[3px] text-[#c99716]">
              Curated for you
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-[#29251f]">
              Featured Products
            </h2>

          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-medium text-[#b27d0d] transition-colors hover:text-[#8e650b] sm:block"
          >
            View All →
          </Link>

        </div>


        <FeaturedProducts />

      </section>


      {/* =====================================================
          STORY SECTION
      ====================================================== */}

      <section
        id="about"
        className="scroll-mt-24 bg-white px-6 py-16 lg:px-10"
      >
        <div className="mx-auto grid max-w-[1300px] items-center gap-10 lg:grid-cols-2">

          <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-[#e3d4b5] bg-[#eee3cf]">
            <Image
              src="/products/lion-basket-green.jpeg"
              alt="Handwoven storage basket from the Home & Living collection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>


          {/* STORY TEXT */}

          <div>

            <p className="text-xs font-medium uppercase tracking-[3px] text-[#c99716]">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#29251f] sm:text-4xl">
              Rooted in heritage.
              <br />
              Made for today.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#686159]">
              MaVidhai brings together thoughtfully made products inspired
              by culture, craftsmanship and everyday life.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#686159]">
              We believe beautiful products should carry meaning while
              fitting naturally into modern living.
            </p>

            <Link
              href="/#about"
              className="mt-7 inline-block rounded-lg border border-[#c99716] px-6 py-3 text-sm font-medium text-[#a9780d] transition-all hover:bg-[#fff8e8]"
            >
              Discover Our Story →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY MAVIDHAI
      ====================================================== */}

      <section className="bg-[#fffdf8] px-6 py-16 lg:px-10">

        <div className="mx-auto max-w-[1300px]">

          <div className="mb-10 text-center">

            <p className="text-xs font-medium uppercase tracking-[3px] text-[#c99716]">
              Why MaVidhai
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-[#29251f]">
              Made with meaning
            </h2>

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon="♡"
              title="Handcrafted"
              description="Made with care by skilled artisans."
            />

            <FeatureCard
              icon="✦"
              title="Heritage Inspired"
              description="Inspired by culture and timeless traditions."
            />

            <FeatureCard
              icon="♧"
              title="Conscious Choices"
              description="Thoughtful products for modern living."
            />

            <FeatureCard
              icon="✧"
              title="Made in India"
              description="Supporting local makers and communities."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWSLETTER
      ====================================================== */}

      <section className="border-y border-[#eee5d2] bg-[#f8f2e6] px-6 py-12 lg:px-10">

        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

          <div>

            <p className="text-lg font-semibold text-[#29251f]">
              Stay connected with MaVidhai
            </p>

            <p className="mt-1 text-sm text-[#756d63]">
              Be the first to know about new collections and stories.
            </p>

          </div>


          <div className="flex w-full max-w-md gap-2">

            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-lg border border-[#dfd2bb] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#aaa092] focus:border-[#c99716]"
            />

            <button
              type="button"
              className="rounded-lg bg-[#d1a11c] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#bd8d0f]"
            >
              Subscribe
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({ title, description, href, image }) {
  return (
    <Link
      href={href}
      className="group block mi-w-0 overflow-hidden rounded-xl border border-[#eadfca] bg-[#fffdf8] transition-all duration-300 hover:-translate-y-1 hover:border-[#d5ae50] hover:shadow-lg"
    >

      <div className="relative aspect-square bg-[#f1e8d7]">
        <Image
          src={image}
          alt={`${title} products`}
          fill
          sizes="(max-width: 640px) 50vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>


      <div className="p-4">

        <h3 className="text-sm font-semibold text-[#3b342b]">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-5 text-[#81786d]">
          {description}
        </p>

      </div>

    </Link>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-[#eadfca] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#d9bf7c] text-xl text-[#c99716]">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#3b342b]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#81786d]">
        {description}
      </p>

    </div>
  );
}
