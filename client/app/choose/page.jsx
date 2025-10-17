"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ChooseRole() {
  const router = useRouter();

  const handleMemberClick = () => {
    router.push("/");
  };

  const handleAdminClick = () => {
    router.push("/admin");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-2 border-amber-600"
        >
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">भूमिका चुनें</h1>
            <p className="text-amber-600 mb-8">कृपया अपनी भूमिका चुनें जिसमें आप काम करना चाहते हैं</p>

            <div className="space-y-4">
              {/* Member Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMemberClick}
                className="w-full py-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-xl border-2 border-amber-300 transition-all shadow-sm"
              >
                🏡 सदस्य के रूप में
              </motion.button>

              {/* Admin Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdminClick}
                className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl border-2 border-amber-800 transition-all shadow-md"
              >
                👑 एडमिन के रूप में
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}