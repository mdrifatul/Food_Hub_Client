"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Cookie,
  Database,
  Lock,
  Mail,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const policies = [
  {
    title: "Information We Collect",
    description:
      "We collect personal information such as your name, email address, delivery address, and payment details when you register, place an order, or communicate with us.",
    icon: <Database className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "How We Use Your Info",
    description:
      "Your information is used to process your orders, improve our services, communicate important updates, and personalize your FoodHub experience.",
    icon: <UserCheck className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Cookies & Tracking",
    description:
      "We use cookies to remember your preferences and analyze site traffic to give you the best, fast, and seamless ordering experience.",
    icon: <Cookie className="w-8 h-8 text-orange-600" />,
  },
  {
    title: "Data Security",
    description:
      "We implement industry-standard encryption and strict security measures to protect your personal and payment information from unauthorized access.",
    icon: <Lock className="w-8 h-8 text-red-600" />,
  },
];

export default function PrivacyPolicyPage() {
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
              Legal & Privacy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8">
              Your Privacy <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                Is Our Priority
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              At FoodHub, we are committed to protecting your personal information and your right to privacy. Here’s everything you need to know about how we manage your data.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Policies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal direction="down">
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                How We Handle Data
              </h2>
              <p className="text-muted-foreground text-lg font-medium">
                Transparency and security are at the core of our operations.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policies.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <Card className="p-8 h-full border-white/10 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-xl hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
                  <div className="mb-6 p-4 w-fit rounded-2xl bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 group-hover:scale-110 transition-transform shadow-sm">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {p.description}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="space-y-12 text-muted-foreground leading-relaxed text-lg">
            
            <div>
              <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-wider uppercase text-sm mb-4">
                <ShieldAlert className="w-5 h-5" />
                <span>Section 1</span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Third-Party Sharing</h3>
              <p>
                We only share your information with third parties when necessary to fulfill your orders (such as local restaurants and delivery riders) or when required by law. We strictly prohibit selling your personal data to advertisers.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-wider uppercase text-sm mb-4">
                <UserCheck className="w-5 h-5" />
                <span>Section 2</span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Your Rights</h3>
              <p>
                Depending on your location, you may have the right to access, update, or delete the information we have on you. If you wish to exercise these rights, simply navigate to your account settings or contact our support team.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-wider uppercase text-sm mb-4">
                <Lock className="w-5 h-5" />
                <span>Section 3</span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Updates to this Policy</h3>
              <p>
                We may update this Privacy Policy periodically to reflect changes to our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Revised" date.
              </p>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-zinc-950 text-white p-12 lg:p-20 relative overflow-hidden shadow-2xl border border-zinc-800 text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] -ml-48 -mb-48" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <ScrollReveal direction="up" className="space-y-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/5 mb-6">
                <Mail className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Have questions about <br />
                <span className="text-orange-500">your privacy?</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium">
                If you have questions or comments about this notice, you may email us at privacy@foodhub.com or contact us via our support page.
              </p>
              
              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
