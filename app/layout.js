import { Toaster } from "react-hot-toast";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FooterBottom } from "@/components/common/FooterBottom";
import NavMenu from "@/components/common/NavigationMenu";

export const metadata = {
  title: "Fashionista - A place for all your fashion needs",
  description: "Welcome to Fashionista. A place for all your fashion needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NavMenu />
        {children}
        <FooterBottom />
        <Toaster />
      </body>
    </html>
  );
}
