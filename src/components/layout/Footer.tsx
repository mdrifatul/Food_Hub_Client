import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-orange-600 text-2xl font-bold mb-4">
              FoodHub 🍱
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Discover & order delicious meals from the best restaurants in your
              area.
            </p>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/meals">Browse Meals</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/providers">Restaurants</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/about">About Us</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              For Partners
            </h4>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/register?role=provider">Become a Provider</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/provider/dashboard">Provider Dashboard</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  123 Food Street, Chattogram, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +880 1234-567890
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 shrink-0 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  support@foodhub.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              asChild
            >
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              asChild
            >
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              asChild
            >
              <Link href="/cookies">Cookie Policy</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
