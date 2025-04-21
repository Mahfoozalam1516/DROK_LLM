"use client";

import React from "react";
import { Globe, MapPin, Trophy, Users, X } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface CompanyInfoProps {
  onClose?: () => void;
}

export function CompanyInfo({ onClose }: CompanyInfoProps) {
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h2 className="text-xl font-bold">About DigiRocket</h2>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        )}
      </div>
      
      <div className="hidden md:block mb-6">
        <h2 className="text-2xl font-bold">About DigiRocket Technologies</h2>
        <p className="text-muted-foreground mt-2">
          A global digital marketing and technology solutions provider
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* Global Presence */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Global Presence</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-7">
            Offices in Gurgaon, India; Dover, Delaware, USA; and London, UK.
          </p>
        </section>
        
        <Separator />
        
        {/* Office Locations */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Office Locations</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 pl-7">
            <li className="py-1">
              <span className="font-medium">USA:</span> 8 The Green, St#4522, Dover, Delaware
            </li>
            <li className="py-1">
              <span className="font-medium">UK:</span> 71-75, Shelton Street, Covent Garden, London, WC2H 9JQ
            </li>
            <li className="py-1">
              <span className="font-medium">India:</span> 2nd Floor, Tower B1, SPAZE ITECH PARK, Unit No. 259, Sector 49, Gurugram, Haryana
            </li>
          </ul>
        </section>
        
        <Separator />
        
        {/* Leadership */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Leadership</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 pl-7">
            <li className="py-1">
              <span className="font-medium">Shubhranshu Srivastava</span> (Founder & CEO)
            </li>
            <li className="py-1">
              <span className="font-medium">Sunny Kumar</span> (Co-Founder & COO)
            </li>
          </ul>
        </section>
        
        <Separator />
        
        {/* Achievements */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Achievements</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 pl-7">
            <li className="py-1">200+ clients served</li>
            <li className="py-1">1200% revenue increase for a US e-commerce client</li>
            <li className="py-1">1328% boost in organic traffic for another client</li>
            <li className="py-1">Semrush Agency Partner, Shopify Partner</li>
            <li className="py-1">Top 10 Digital Marketing Agency in Palwal 2023</li>
          </ul>
        </section>
        
        <Separator />
        
        {/* Contact */}
        <section className="space-y-3">
          <p className="text-sm">
            Schedule a free consultation at{" "}
            <a href="https://www.digirocket.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.digirocket.io
            </a>{" "}
            or{" "}
            <a href="https://www.digirockett.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.digirockett.com
            </a>
          </p>
        </section>
      </motion.div>
    </div>
  );
}