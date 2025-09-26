import Banner from "@/components/Home/Banner";
import BuildForEveryone from "@/components/Home/BuildForEveryone";
import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Testimonials from "@/components/Home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <BuildForEveryone></BuildForEveryone>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
}
