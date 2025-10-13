import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const page = () => {
  return (
    <>
      <Header/>
      
      {/* Main About Content */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Top Section: Text + Image */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Left Side: Text about the village */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-green-800 mb-4">कलुपुरा गाँव के बारे में</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              कलुपुरा एक सुंदर और शांत गाँव है, जो प्राकृतिक सौंदर्य और ग्रामीण संस्कृति का अद्भुत मिश्रण पेश करता है। यहाँ की खेती योग्य भूमि, हरे-भरे खेत और नदियों की धाराएँ इसे एक आदर्श ग्रामीण जीवन का केंद्र बनाती हैं। यहाँ के लोग सरल, मेहनती और अतिथि-प्रिय हैं।
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              गाँव में छोटे-छोटे घर, चौपाल, और बच्चों की हँसी-खुशी की आवाज़ें दिनभर सुनाई देती हैं। यहाँ की संस्कृति, त्योहार और लोकगीत इस गाँव की अनूठी पहचान हैं।
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              कलुपुरा में आपको शहर की भागदौड़ से दूर, प्रकृति के बीच एक शांत और खुशहाल जीवन देखने को मिलेगा। यहाँ का हर पल शांति और सुख का अनुभव कराता है।
            </p>
          </div>

          {/* Right Side: Placeholder Image */}
          <div className="lg:w-1/2 bg-green-50 rounded-lg p-4 border-2 border-green-200 flex items-center justify-center">
            <div className="w-full h-80 bg-green-100 rounded-md flex items-center justify-center text-green-600 font-semibold">
              🖼️ गाँव की तस्वीर (Image Placeholder)
            </div>
          </div>
        </div>

        {/* Bottom Section: History of Kalupra */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">कलुपुरा का इतिहास</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            कलुपुरा का इतिहास कई सदियों पुराना है। कहा जाता है कि यह गाँव किसी राजा के शासनकाल में बसा था। यहाँ के पुराने मंदिर और कुएँ इसके ऐतिहासिक महत्व के साक्षी हैं।
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            गाँव का नाम "कलुपुरा" एक प्राचीन वृक्ष "कलु" और "पुरा" (जगह) से मिलकर बना है, जो इस बात का संकेत देता है कि यहाँ एक बड़ा कलु का पेड़ था जिसके आसपास लोग बसे थे।
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            आज भी गाँव में उन्हीं परंपराओं और मान्यताओं का पालन किया जाता है, जो इसे अपनी विशिष्ट पहचान देती हैं। यहाँ के लोग अपने इतिहास को गर्व से याद करते हैं और आने वाली पीढ़ियों तक इसे संजोए रखने की कोशिश करते हैं।
          </p>
        </div>

      </div>

      <Footer/>
    </>
  )
}

export default page