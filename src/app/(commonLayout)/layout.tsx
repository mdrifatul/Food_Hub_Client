import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
