import { footerItems, socialLinks } from "@/config/config";
import { DecryptLink } from "./decryptLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-zinc-400 font-mono text-xs border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-zinc-200 font-semibold tracking-wider uppercase mb-3 text-xs flex items-center gap-1.5">
            <span className="text-red-500 font-bold">//</span> MENU
          </h4>
          <ul className="space-y-2">
            {footerItems.map((item, id) => (
              <li key={id}>
                <DecryptLink
                  href={`#${item.href.toLowerCase()}`}
                  className="hover:text-red-400 transition-colors uppercase tracking-wider block py-0.5"
                >
                  {item.label}
                </DecryptLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-zinc-200 font-semibold tracking-wider uppercase mb-3 text-xs flex items-center gap-1.5">
            <span className="text-red-500 font-bold">//</span> SOCIAL
          </h4>
          <ul className="space-y-2">
            {socialLinks.map((item, id) => (
              <li key={id}>
                <DecryptLink
                  href={item.href}
                  className="hover:text-red-400 transition-colors uppercase tracking-wider block py-0.5"
                >
                  {item.title}
                </DecryptLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900 bg-black px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-600 text-[11px] tracking-wider uppercase">
          <div>
            © {currentYear} ALPHACVPS. TUTTI I DIRITTI RISERVATI.
          </div>
        </div>
      </div>
    </footer>
  );
}
