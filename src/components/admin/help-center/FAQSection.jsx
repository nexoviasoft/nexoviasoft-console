"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by going to the login page and clicking 'Forgot Password'. Follow the instructions sent to your email to set a new password."
    },
    {
      question: "Can I export attendance reports?",
      answer: "Yes, you can export reports in PDF or CSV format from the Attendance section. Click on the 'Export' button in the top right corner."
    },
    {
      question: "How do I add a new employee?",
      answer: "To add a new employee, navigate to the Employee Directory and click the 'Add Employee' button. Fill in the required details and save."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, NexoviaSoft Console is a web-based application optimized for desktop and tablet use. A mobile app is on our roadmap for Q4."
    },
    {
      question: "How can I contact support?",
      answer: "If you can't find the answer you're looking for, you can contact our support team via email at support@nexoviasoft.com or use the 'Contact Support' button below."
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-white font-medium hover:text-[#F58220] text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="lg:col-span-1">
        <div className="glass-card rounded-2xl p-6 border border-white/20 sticky top-8">
           <div className="w-12 h-12 bg-[#F58220]/15 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-[#F58220]" />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">Still need help?</h3>
           <p className="text-sm text-white/70 mb-6">
             Our support team is available 24/7 to assist you with any issues.
           </p>
           <Button className="w-full bg-[#F58220] hover:bg-[#d91d79] text-black glass-button">
             Contact Support
           </Button>
           <div className="mt-4 text-center">
             <a href="#" className="text-sm text-white/60 hover:text-[#F58220] underline">
               View System Status
             </a>
           </div>
        </div>
      </div>
    </div>
  );
}
