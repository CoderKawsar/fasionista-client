import { MegaFooter } from "@/components/common/MegaFooter";
import { HappyClients } from "@/components/Home/HappyClients/HappyClients";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import { NewArrivals } from "@/components/Home/NewArrivals/NewArrivals";
import { OrderEfficiency } from "@/components/Home/OrderEfficiency/OrderEfficiency";
import { ShopByCategory } from "@/components/Home/ShopByCategory/ShopByCategory";
import { ShopTheLook } from "@/components/Home/ShopTheLook/ShopTheLook";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <ShopByCategory />
        <NewArrivals />
        <ShopTheLook />
        <HappyClients />
        <OrderEfficiency />
        <MegaFooter />
      </main>
    </div>
  );
}
