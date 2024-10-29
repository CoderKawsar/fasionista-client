import HeroSection from "@/components/Home/HeroSection/HeroSection";
import { NewArrivals } from "@/components/Home/NewArrivals/NewArrivals";
import { ShopByCategory } from "@/components/Home/ShopByCategory/ShopByCategory";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <ShopByCategory />
        <NewArrivals />
      </main>
      <footer className=""></footer>
    </div>
  );
}
