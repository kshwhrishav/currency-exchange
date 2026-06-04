import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Converter", href: "/converter" },
  { label: "Trends", href: "/trends" },
  { label: "Compare", href: "/compare" },
  { label: "Watchlist", href: "/watchlist" },
  { label: "Heatmap", href: "/heatmap" },
  { label: "Crypto Live", href: "/live" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-white">
          FxPulse
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}