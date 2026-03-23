import Link from "next/link";

export default function Footer() {
  const links = {
    company: [
      { href: "/about", label: "हमारे बारे में" },
      { href: "/contact", label: "संपर्क करें" },
      { href: "/faq", label: "अक्सर पूछे जाने वाले सवाल" },
    ],
    resources: [
      { href: "/schemes", label: "सभी योजनाएं" },
      { href: "/blog", label: "ब्लॉग" },
      { href: "/help", label: "सहायता केंद्र" },
    ],
    legal: [
      { href: "/privacy", label: "गोपनीयता नीति" },
      { href: "/terms", label: "नियम और शर्तें" },
      { href: "/disclaimer", label: "अस्वीकरण" },
    ],
  };

  return (
    <footer className="bg-[var(--sarkari-navy)] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold">SarkariSaathi</span>
            </Link>
            <p className="text-sm text-white/70 text-hindi leading-relaxed">
              हर Indian की हक की scheme — AI से, free में। सरकारी योजनाओं को खोजें, समझें और आवेदन करें।
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-sm text-white/60">Digital India Initiative</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[var(--sarkari-saffron-light)] text-hindi">
              कंपनी
            </h4>
            <ul className="space-y-2.5">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors text-hindi"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[var(--sarkari-saffron-light)] text-hindi">
              संसाधन
            </h4>
            <ul className="space-y-2.5">
              {links.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors text-hindi"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[var(--sarkari-saffron-light)] text-hindi">
              कानूनी
            </h4>
            <ul className="space-y-2.5">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors text-hindi"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} SarkariSaathi. All rights reserved.
            </p>
            <p className="text-sm text-white/50">
              Made with ❤️ for Bharat 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
