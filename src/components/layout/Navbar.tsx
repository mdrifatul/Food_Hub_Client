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

import { authClient } from "@/lib/auth-client";
import { useCart } from "@/lib/user-cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

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
    { title: "Home", url: "/" },
    {
      title: "About",
      url: "/about",
    },
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
    <section className={cn("py-4 dark:bg-gray-950", className)}>
      <div className="w-11/12 mx-auto">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-2xl font-semibold tracking-tighter text-orange-600">
                {logo.title}
              </span>
            </a>
            <h1></h1>
            <div className="flex items-center ">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <ModeToggle />

            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-600/95 relative"
                  asChild
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
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
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-600/95"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      {userName ? `${userName}` : "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {userRole === "USER" && (
                      <DropdownMenuItem>
                        <Link
                          className="cursor-pointer text-orange-600 flex"
                          href="/providerForm"
                        >
                          <Store className="mr-4 h-4 w-4" />
                          <span>Provider Account</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950/50"
                >
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950/50"
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
              <span className="text-2xl font-semibold tracking-tighter text-orange-600">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <span className="text-2xl font-semibold tracking-tighter text-orange-600">
                        {logo.title}
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
                    <ModeToggle />

                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-600/95 relative w-full justify-start"
                          asChild
                        >
                          <Link href="/cart">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Cart
                            {totalItems > 0 && (
                              <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {totalItems > 99 ? "99+" : totalItems}
                              </span>
                            )}
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-600/95 w-full justify-start"
                          asChild
                        >
                          <Link href="/dashboard">
                            <Settings className="h-5 w-5 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-600/95 w-full justify-start"
                          asChild
                        >
                          <Link
                            className="cursor-pointer text-orange-600 flex"
                            href="/providerForm"
                          >
                            <Store className="mr-4 h-4 w-4" />
                            <span>Provider Account</span>
                          </Link>
                        </Button>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-950/50 w-full justify-start"
                        >
                          <LogOut className="h-5 w-5 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950/50"
                        >
                          <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950/50"
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
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground dark:bg-gray-950"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

export { Navbar };
