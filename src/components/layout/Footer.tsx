"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="border-t border-border bg-background relative overflow-hidden"
    >
      {/* Super subtle modern glow */}
      <div className="absolute top-0 right-1/4 w-lg h-lg bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:w-1/3">
            <Link
              href="/"
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <h3 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
                <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  FoodHub
                </span>
                <span className="text-2xl">🍱</span>
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-medium">
              The ultimate food delivery experience. Fast, fresh, and reliable
              right to your doorstep.
            </p>
          </div>

          {/* Links Group */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 lg:w-2/3 lg:justify-end">
            <div>
              <h4 className="text-foreground font-semibold tracking-wide mb-6 text-sm">
                Product
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/meals"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Browse Meals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/providers"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Restaurants
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold tracking-wide mb-6 text-sm">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register?role=provider"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/provider/dashboard"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold tracking-wide mb-6 text-sm">
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom minimalist line */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-orange-500 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-orange-500 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-orange-500 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
