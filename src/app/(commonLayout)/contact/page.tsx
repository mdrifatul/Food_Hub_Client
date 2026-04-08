"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

const contactInfo = [
  {
    title: "Email Us",
    detail: "support@foodhub.com",
    subDetail: "Response within 24 hours",
    icon: <Mail className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Call Us",
    detail: "+1 (555) 123-4567",
    subDetail: "Mon-Fri from 9am to 6pm",
    icon: <Phone className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Visit Us",
    detail: "123 Food Street",
    subDetail: "Brooklyn, NY 11201",
    icon: <MapPin className="w-6 h-6 text-orange-600" />,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-background pt-16 pb-24">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/20 rounded-full blur-[100px] -ml-32 -mb-32" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal direction="down">
            <Badge
              variant="outline"
              className="mb-6 text-orange-600 border-orange-200 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/10 px-4 py-1.5 font-bold uppercase tracking-wider text-xs"
            >
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              We&apos;d love to <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                Hear From You
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? Our team is
              always ready to assist you on your culinary journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, i) => (
            <ScrollReveal key={i} delay={i * 0.15} direction="up">
              <Card className="p-8 border-white/10 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-xl hover:border-orange-500/50 hover:shadow-2xl transition-all duration-500 group h-full flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all" />
                <div className="mb-6 p-4 rounded-2xl bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{info.title}</h3>
                <p className="text-lg font-semibold text-foreground mb-1">
                  {info.detail}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {info.subDetail}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <ScrollReveal direction="up">
          <div className="space-y-8 bg-white/5 dark:bg-zinc-900/40 border-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
                  <MessageSquare className="text-orange-500" />
                  Send us a Message
                </h2>
                <p className="text-muted-foreground font-medium">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-muted/30 dark:bg-zinc-900/50 border border-border/50 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-muted/30 dark:bg-zinc-900/50 border border-border/50 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Order Inquiry"
                    className="w-full bg-muted/30 dark:bg-zinc-900/50 border border-border/50 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground ml-1">Your Message</label>
                  <textarea 
                    rows={6}
                    placeholder="Tell us more about how we can help..."
                    className="w-full bg-muted/30 dark:bg-zinc-900/50 border border-border/50 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium resize-none"
                  />
                </div>

                <Button className="w-full h-14 rounded-2xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
