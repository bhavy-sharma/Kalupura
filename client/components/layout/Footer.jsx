// components/layout/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brown text-cream py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <Link href="/" className="text-xl font-bold text-cream">
            Kalupura Village
          </Link>
        </div>
        <p className="text-cream/80 text-sm max-w-2xl mx-auto">
          Building a connected, digital-first rural community while preserving our heritage and values.
        </p>
        <div className="mt-6 text-xs text-cream/60">
          © {new Date().getFullYear()} Kalupura Village. All rights reserved.
        </div>
      </div>
    </footer>
  );
}