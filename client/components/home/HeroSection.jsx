// components/home/HeroSection.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green to-emerald-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Welcome to Kalupura
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90"
        >
          A village where tradition, unity, and progress walk hand in hand.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/signup"
            className="bg-white text-green font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-cream transition-colors"
          >
            Join Now
          </Link>
          <Link
            href="/login"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
          >
            Log In
          </Link>
        </motion.div>
      </div>
    </section>
  );
}