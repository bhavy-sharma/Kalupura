// app/page.js
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  // Mock stats (baad me backend se aayenge)
  const stats = [
    { label: 'पंजीकृत परिवार', value: '142' },
    { label: 'कुल सदस्य', value: '587' },
    { label: 'वाहन', value: '98' },
    { label: 'गाँव की उम्र', value: '200+ वर्ष' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8DC] font-sans">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-village-green to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md"
          >
            स्वागत है आपका
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold mb-6"
          >
            कलूपुरा गाँव में
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            एक ऐसा समुदाय जहाँ परंपरा, एकता और प्रगति एक साथ चलती है।
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/signup"
              className="bg-white text-village-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-village-cream transition"
            >
              अभी जुड़ें
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition"
            >
              लॉग इन करें
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-village-brown mb-10">
            हमारे गाँव के आँकड़े
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-village-cream rounded-xl shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-village-green mb-2">
                  {stat.value}
                </div>
                <div className="text-village-brown font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Village */}
      <section className="py-16 bg-[#f0f9f0]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-village-brown mb-8">
            कलूपुरा के बारे में
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
            कलूपुरा, एक छोटा सा गाँव जो अपनी सामुदायिक भावना, हरियाली और सादगी के लिए जाना जाता है।
            यहाँ हर परिवार एक दूसरे का सहारा है, और हर त्योहार साथ मिलकर मनाया जाता है।
          </p>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            हमारा उद्देश्य है कि डिजिटल दुनिया में भी हमारी पहचान, एकता और संवाद बना रहे।
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-village-brown text-village-cream py-8 text-center">
        <p className="mb-4">क्या आप कलूपुरा के परिवार का हिस्सा बनना चाहते हैं?</p>
        <Link
          href="/signup"
          className="inline-block bg-village-green text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-700 transition"
        >
          अभी पंजीकरण करें
        </Link>
      </footer>
    </div>
  );
}