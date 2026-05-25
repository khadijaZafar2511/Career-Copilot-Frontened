import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

// Data Arrays

const BRAND_DATA = {
  name: "Career Copilot",
  description:
    "Your AI-powered career roadmap & learning companion. Build skills, track progress, and become job-ready with guided roadmaps.",
};

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Explore Roadmaps", href: "/roadmaps" },
      { label: "Projects", href: "/projects" },
      { label: "Quizzes", href: "/quizzes" },
      { label: "AI Mentor Chat", href: "/mentor" },
      { label: "Resources Hub", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Career Copilot", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Report a Bug", href: "/support/bug" },
      { label: "Request a Feature", href: "/support/feature" },
      { label: "Community Guidelines", href: "/community-guidelines" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Twitter (X)", href: "https://twitter.com", icon: faXTwitter },
  {
    label: "GitHub",
    href: "https://github.com/khadijaZafar2511",
    icon: faGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/khadija-zafar-257702391",
    icon: faLinkedin,
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

// 2. Component Structure
export default function SiteFooter() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form handling login here
  };

  return (
    <footer className="w-full border-t bg-background text-muted-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-5">
        {/* Brand Column */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <span className="text-lg font-bold text-foreground">
            {BRAND_DATA.name}
          </span>
          <p className="text-sm max-w-xs">{BRAND_DATA.description}</p>

          {/* Social Links Loop */}
          <div className="flex gap-4 mt-2">
            {SOCIAL_LINKS.map(({ icon, label, href }) => (
              <Link
                key={label}
                to={href}
                aria-label={label}
                className="hover:text-foreground text-lg transition-colors"
              >
                <FontAwesomeIcon icon={icon} className="text-blue-600" />
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic Link Columns Loop */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-3 text-sm">
            <span className="font-semibold text-foreground">
              {section.title}
            </span>
            {section.links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6 text-center text-xs">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_DATA.name}. All rights
            reserved.
          </p>

          {/* Legal Links Loop */}
          <div className="flex gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
