import Image from "next/image";
import HeroSection from "../../components/HeroSection";
import { Footer } from "../../components/Footer";
import HeaderHome from "@/app/components/HeaderHome";

export default function Home() {
  return (
    <div className="dark:bg-white ">
      <HeaderHome />
      <HeroSection />
      <Footer />
    </div>
  );
}
