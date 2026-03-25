import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();

  const links = {
    company: [
      { href: "/about", label: t('footer.about') },
      { href: "/contact", label: t('footer.contact') },
      { href: "/faq", label: t('footer.faq') },
    ],
    resources: [
      { href: "/schemes", label: t('footer.allSchemes') },
      { href: "/blog", label: t('footer.blog') },
      { href: "/help", label: t('footer.helpCenter') },
    ],
    legal: [
      { href: "/privacy", label: t('footer.privacyPolicy') },
      { href: "/terms", label: t('footer.terms') },
      { href: "/disclaimer", label: t('footer.disclaimer') },
    ],
  };

  return (
    <footer className="bg-[var(--sarkari-navy)] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={"/" as any} className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold">SarkariSaathi</span>
            </Link>
            <p className="text-sm text-white/70 text-hindi leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-sm text-white/60">Digital India Initiative</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[var(--sarkari-saffron-light)] text-hindi">
              {t('footer.company')}
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
              {t('footer.resources')}
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
              {t('footer.legal')}
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
              © {new Date().getFullYear()} SarkariSaathi. {t('footer.rights')}
            </p>
            <p className="text-sm text-white/50">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
