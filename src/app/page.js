import Banner from "@/components/Home/Banner";
import BuildForEveryone from "@/components/Home/BuildForEveryone";
import Features from "@/components/Home/Features";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <BuildForEveryone></BuildForEveryone>
    </div>
  );
}
