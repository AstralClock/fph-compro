"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { Global } from "@/types/strapi";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About Us", href: "/#about" },
  { name: "Vision & Mission", href: "/#vision" },
  { name: "Projects", href: "/#projects" },
  { name: "Our Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

export function Footer({ logoUrl, data }: { logoUrl: string | null, data?: Global | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (href: string) => {
    // If not on homepage, route to homepage with anchor
    if (pathname !== "/") {
      router.push(href);
      return;
    }

    // If on homepage, smooth scroll
    const targetId = href.replace("/", "");
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-primary-foreground pt-20 pb-8 relative overflow-hidden">
      {/* Subtle top gradient line for depth */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-20" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description (Takes up more space) */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <div className="mb-8">
              {logoUrl ? (
                <Image src={logoUrl} alt="FPH Logo" width={120} height={60} className="object-contain" unoptimized />
              ) : (
                <span className="text-4xl font-bold font-serif text-primary-foreground tracking-wider">FPH</span>
              )}
            </div>
            <p className="text-primary-foreground/70 text-base leading-loose max-w-md">
              {data?.footerDescription || "Fortis Prima Hanami — Your strategic partner for driving transformation and sustainable growth in today's dynamic business landscape."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-serif tracking-wide text-primary-foreground mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-gold transition-all duration-300 hover:translate-x-2 flex items-center group text-base"
                  >
                    <span className="w-0 h-0.5 bg-gold mr-0 group-hover:w-3 group-hover:mr-3 transition-all duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-serif tracking-wide text-primary-foreground mb-8">Contact Us</h3>
            <div className="space-y-6">
              
              {data?.office && data.office.length > 0 ? (
                data.office.map((office) => (
                  <div key={office.id} className="flex items-start gap-4">
                    <div className="bg-gold/10 p-2.5 rounded-full mt-1">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-primary-foreground font-medium mb-1">{office.name}</p>
                      {office.mapsUrl ? (
                        <a 
                          href={office.mapsUrl.startsWith('http') ? office.mapsUrl : `https://${office.mapsUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-foreground/60 text-sm leading-relaxed hover:text-gold hover:underline transition-colors block"
                        >
                          {office.address}
                        </a>
                      ) : (
                        <p className="text-primary-foreground/60 text-sm leading-relaxed">
                          {office.address}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-2.5 rounded-full mt-1">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-primary-foreground font-medium mb-1">Bintaro Office</p>
                      <p className="text-primary-foreground/60 text-sm leading-relaxed">
                        Jl. Bintaro Utama Sektor 3A, Tangerang Selatan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-2.5 rounded-full mt-1">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-primary-foreground font-medium mb-1">Medan Office</p>
                      <p className="text-primary-foreground/60 text-sm leading-relaxed">
                        Jl. Gatot Subroto No. 123, Medan
                      </p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex items-center gap-4 pt-2">
                <div className="bg-gold/10 p-2.5 rounded-full">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
                <span className="text-primary-foreground/70">{data?.phone || "+62 21 1234 5678"}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-gold/10 p-2.5 rounded-full">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <span className="text-primary-foreground/70">{data?.email || "info@fph.co.id"}</span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            {data?.copyrightText || `© ${new Date().getFullYear()} Fortis Prima Hanami. All rights reserved.`}
          </p>
          <p className="text-sm text-primary-foreground/40 font-serif italic">
            Smart Business Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}