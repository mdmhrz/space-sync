import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { OtpProvider } from "@/context/OtpContext";
import { ToastContainer } from "react-toastify";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"]
})

export const metadata = {
  title: "SpaceSync",
  description: "Your Regular App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} antialiased`}
      >
        <Header></Header>
        <OtpProvider>{children}</OtpProvider>
        <Footer></Footer>
        <ToastContainer />
      </body>
    </html>
  );
}
