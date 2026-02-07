import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { userService } from "../../services/user.service";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = await userService.getSession();
  const isLoggedIn = !!session;
  const userName = session?.user?.name || session?.name;
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} userName={userName} />
      <div className="mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
