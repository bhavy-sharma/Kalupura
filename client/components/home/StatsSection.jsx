// components/home/StatsSection.jsx
'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Registered Families', value: '142' },
  { label: 'Total Members', value: '587' },
  { label: 'Vehicles', value: '98' },
  { label: 'Village Age', value: '200+ Years' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-brown mb-12">
          Village at a Glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-cream rounded-xl shadow-sm border border-cream-light"
            >
              <div className="text-3xl md:text-4xl font-bold text-green mb-2">
                {stat.value}
              </div>
              <div className="text-brown font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}