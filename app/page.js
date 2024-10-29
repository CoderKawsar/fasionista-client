import HeroSection from "@/components/Home/HeroSection/HeroSection";
import { ShopByCategory } from "@/components/Home/ShopByCategory/ShopByCategory";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <ShopByCategory />
      </main>
      <footer className=""></footer>
    </div>
  );
}
