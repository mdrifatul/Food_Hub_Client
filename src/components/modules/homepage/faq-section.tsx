"use client";

import { HelpCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order in real-time through the 'My Orders' section in your dashboard. You'll also receive SMS notifications for key milestones.",
  },
  {
    question: "Do you offer contact-less delivery?",
    answer: "Yes, all our deliveries are contact-less by default. You can specify a drop-off location in the checkout notes.",
  },
  {
    question: "What is your refund policy?",
    answer: "If there's an issue with your meal, please reach out via our contact form within 2 hours of delivery for a full refund or replacement.",
  },
  {
    question: "Can I become a FoodHub partner?",
    answer: "Absolutely! Head over to the 'Partner With Us' link in the footer to start your application process.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-orange-500/5 rounded-full blur-[100px] -ml-36 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal direction="down">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-4">
              <HelpCircle className="w-10 h-10 text-orange-500" />
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers. Everything you need to know about
              the FoodHub experience.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.2}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="border border-border/50 rounded-2xl px-8 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline font-bold text-lg text-foreground py-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base font-medium leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
