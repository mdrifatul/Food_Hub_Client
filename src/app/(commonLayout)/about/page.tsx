"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    title: "Quality First",
    description:
      "We partner only with the best local kitchens to ensure every meal meets our high standards.",
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "Community Driven",
    description:
      "Supporting local chefs and small businesses is at the heart of everything we do.",
    icon: <Users className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Speedy Delivery",
    description:
      "Our logistics network is optimized to get your food to you while it's still piping hot.",
    icon: <Rocket className="w-8 h-8 text-orange-600" />,
  },
  {
    title: "Craft with Love",
    description:
      "Food is more than sustenance; it's an experience crafted with passion and care.",
    icon: <Heart className="w-8 h-8 text-red-600" />,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-orange-400/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-red-400/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="down">
            <Badge
              variant="outline"
              className="mb-6 text-orange-600 border-orange-200 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/10 px-4 py-1.5 text-sm font-semibold"
            >
              Our Story
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8">
              We&apos;re Reimagining <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                The Food Experience
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              FoodHub isn&apos;t just a delivery platform. We&apos;re a
              community of food lovers, local chefs, and tech innovators working
              together to bring authentic global flavors to your doorstep.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Narrative Section - Our Story */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/foodhub_team_1775626744540.png"
                  alt="FoodHub Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-orange-500/20 to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" className="space-y-8">
              <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-wider uppercase text-sm">
                <UtensilsCrossed className="w-5 h-5" />
                <span>Established 2024</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                How it all began
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  It started around a small dining table in Brooklyn. Our
                  founders realized that while delivery was fast, the *soul* of
                  local cooking was being lost in corporate algorithms. They
                  wanted a way to connect talented local chefs directly with
                  neighborhoods.
                </p>
                <p>
                  Today, FoodHub supports over 500 local providers, ranging from
                  hidden family-owned bistros to innovative culinary startups.
                  We believe everyone deserves a restaurant-quality meal, even
                  on a Tuesday night in pajamas.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h3 className="text-3xl font-bold text-orange-600">500+</h3>
                  <p className="font-semibold text-foreground">
                    Local Partners
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-red-600">20k+</h3>
                  <p className="font-semibold text-foreground">Happy Foodies</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal direction="down">
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Values that drive us
              </h2>
              <p className="text-muted-foreground text-lg font-medium">
                Why we do what we do, every single day.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <Card className="p-8 h-full border-white/10 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-xl hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
                  <div className="mb-6 p-4 w-fit rounded-2xl bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 group-hover:scale-110 transition-transform shadow-sm">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {v.description}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-zinc-950 text-white p-12 lg:p-20 relative overflow-hidden shadow-2xl border border-zinc-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] -mr-48 -mt-48" />

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <ScrollReveal direction="right" className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Want to join <br />
                <span className="text-orange-500">our mission?</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium">
                Whether you&apos;re a chef looking to grow your business or a
                developer wanting to build the future of food tech, we&apos;d
                love to hear from you.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <Mail className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="font-semibold">hello@foodhub.com</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <Phone className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="font-semibold">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="font-semibold">Brooklyn, NY 11201</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="left"
              className="flex items-center justify-center"
            >
              <Card className="w-full bg-white/10 dark:bg-zinc-900/50 border-white/10 p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500/20 rounded-full blur-[50px] pointer-events-none" />
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Quick Contact</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-zinc-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-zinc-500"
                    />
                    <textarea
                      placeholder="How can we help?"
                      rows={4}
                      className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-zinc-500 resize-none"
                    />
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-orange-500/20">
                      Send Message
                    </Button>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
