"use client";

import {
  LogOut,
  Menu,
  Settings,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCart } from "@/context/CartContext";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./../../layout/ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  isLoggedIn?: boolean;
  userName?: string;
  userRole?: string;
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/",
    alt: "logo",
    title: "Food Hub",
  },
  menu = [
    { title: "Meals", url: "/meals" },
    { title: "About Us", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Policy", url: "/privacy" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
  isLoggedIn = false,
  userName,
  userRole,
}: Navbar1Props) => {
  const router = useRouter();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <motion.section
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50 supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-zinc-950/60 shadow-xs transition-all",
        className,
      )}
    >
      <div className="w-11/12 mx-auto py-3.5">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="FoodHub Logo"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-xl font-black tracking-widest bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
                FOODHUB
              </span>
            </a>
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <ModeToggle />

            {isLoggedIn ? (
              <>
                {userRole === "USER" && (
                  <Button
                    asChild
                    className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white shadow-sm font-semibold h-10 px-5 transition-all"
                  >
                    <Link href="/providerForm">
                      <span>Create Provider Account</span>
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-zinc-200/50 bg-white/50 text-zinc-700 hover:bg-zinc-100 hover:text-foreground dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all shadow-sm shrink-0"
                  asChild
                >
                  <Link href="/cart" className="relative group">
                    <ShoppingCart className="h-[1.15rem] w-[1.15rem] group-hover:scale-110 transition-transform" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-linear-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md ring-2 ring-white dark:ring-zinc-950">
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full border-zinc-200/50 bg-white/50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all shadow-sm shrink-0"
                    >
                      <User className="h-[1.15rem] w-[1.15rem]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 rounded-2xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl overflow-hidden p-1.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-zinc-950/60"
                  >
                    <DropdownMenuLabel className="font-bold py-3 px-3 text-sm flex items-center gap-3 rounded-xl m-0.5 bg-zinc-50 dark:bg-zinc-900/50">
                      <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                        <User className="h-[1.15rem] w-[1.15rem]" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="leading-tight mb-0.5 truncate text-foreground">
                          {userName ? `${userName}` : "My Account"}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground leading-none uppercase tracking-wider">
                          {userRole || "Guest"}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800/80 mx-2 my-1" />
                    <DropdownMenuItem
                      asChild
                      className="p-3 mx-1 my-1 rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-foreground font-medium transition-colors"
                    >
                      <Link
                        href={`/${userRole === "ADMIN" ? "admin-dashboard" : userRole === "PROVIDER" ? "provider-dashboard" : "dashboard"}`}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800/80 mx-2 my-1" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="p-3 mx-1 my-1 rounded-xl cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50 focus:text-red-700 dark:focus:text-red-300 font-medium transition-colors"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Logout Workspace</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold px-6 transition-all"
                >
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>

                <Button
                  asChild
                  className="rounded-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md shadow-orange-500/20 dark:shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 font-bold px-6 border-0 transition-all duration-300"
                >
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center">
                <img
                  src="/logo.png"
                  alt="FoodHub Logo"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-xl font-black tracking-widest bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
                FOODHUB
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 shadow-sm rounded-xl"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto border-zinc-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-zinc-950/80">
                <SheetHeader>
                  <SheetTitle>
                    <a
                      href={logo.url}
                      className="flex items-center justify-center gap-2 pb-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center">
                        <img
                          src="/logo.png"
                          alt="FoodHub Logo"
                          className="h-full w-full object-contain drop-shadow-sm"
                        />
                      </div>
                      <span className="text-2xl font-black tracking-widest bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        FOODHUB
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center px-1 mb-2">
                      <span className="font-semibold text-sm text-muted-foreground">
                        Appearance
                      </span>
                      <ModeToggle />
                    </div>

                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80 relative w-full justify-start h-12"
                          asChild
                        >
                          <Link href="/cart" className="relative">
                            <ShoppingCart className="h-5 w-5 mr-3 text-zinc-500" />
                            <span className="font-semibold">Cart</span>
                            {totalItems > 0 && (
                              <span className="ml-auto bg-linear-to-r from-orange-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                {totalItems > 99 ? "99+" : totalItems}
                              </span>
                            )}
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80 w-full justify-start h-12"
                          asChild
                        >
                          <Link
                            href={`/${userRole === "ADMIN" ? "admin-dashboard" : userRole === "PROVIDER" ? "provider-dashboard" : "dashboard"}`}
                          >
                            <Settings className="h-5 w-5 mr-3 text-zinc-500" />
                            <span className="font-semibold">Dashboard</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80 w-full justify-start h-12"
                          asChild
                        >
                          <Link href="/providerForm">
                            <Store className="h-5 w-5 mr-3 text-zinc-500" />
                            <span className="font-semibold">
                              Provider Account
                            </span>
                          </Link>
                        </Button>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50 w-full justify-start h-12 mt-2"
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          <span className="font-semibold">Logout</span>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80 h-12 font-semibold"
                        >
                          <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>

                        <Button
                          asChild
                          className="rounded-xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md shadow-orange-500/20 dark:shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/30 font-bold border-0 h-12 transition-all"
                        >
                          <a href={auth.signup.url}>{auth.signup.title}</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-semibold transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <a
      key={item.title}
      href={item.url}
      className="text-lg font-semibold text-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors px-2 py-1"
    >
      {item.title}
    </a>
  );
};

export { Navbar };
