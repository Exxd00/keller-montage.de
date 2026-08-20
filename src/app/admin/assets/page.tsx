import type { Metadata } from "next";
import { Download, Image as ImageIcon, FileImage, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin - Assets Download",
  robots: {
    index: false,
    follow: false,
  },
};

// All assets used in the website
const assets = {
  logo: {
    name: "Favicon / Logo",
    path: "/favicon.svg",
    type: "SVG",
    description: "الأيقونة الرئيسية للموقع - شكل منزل برتقالي",
  },
  galleryImages: [
    {
      id: 1,
      name: "Moderne Küche Montage",
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90",
      category: "Küche",
      downloadName: "kueche-montage-1.jpg",
    },
    {
      id: 2,
      name: "Wohnzimmer Einrichtung",
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90",
      category: "Wohnzimmer",
      downloadName: "wohnzimmer-1.jpg",
    },
    {
      id: 3,
      name: "Schlafzimmer Schrank",
      src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=90",
      category: "Schlafzimmer",
      downloadName: "schlafzimmer-schrank-1.jpg",
    },
    {
      id: 4,
      name: "IKEA PAX Schrank",
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=90",
      category: "Schränke",
      downloadName: "pax-schrank-1.jpg",
    },
    {
      id: 5,
      name: "Küchen Installation",
      src: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=90",
      category: "Küche",
      downloadName: "kueche-installation-1.jpg",
    },
    {
      id: 6,
      name: "Büromöbel Aufbau",
      src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=90",
      category: "Büro",
      downloadName: "buero-moebel-1.jpg",
    },
  ],
  googleAdsImages: {
    required: [
      {
        name: "Landscape Image",
        size: "1200 x 628 px",
        description: "للإعلانات المستطيلة - Display Ads",
      },
      {
        name: "Square Image",
        size: "1200 x 1200 px",
        description: "للإعلانات المربعة - Display Ads",
      },
      {
        name: "Logo",
        size: "1200 x 1200 px",
        description: "لوغو الشركة للإعلانات",
      },
    ],
  },
};

export default function AdminAssetsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
          <Lock className="w-6 h-6 text-orange-500" />
          <h1 className="text-2xl font-bold">Admin - Assets Download</h1>
          <span className="text-xs bg-red-600 px-2 py-1 rounded">صفحة خاصة - غير مفهرسة</span>
        </div>

        {/* Logo Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileImage className="w-5 h-5 text-orange-500" />
            اللوغو / Favicon
          </h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2">
                <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{assets.logo.name}</h3>
                <p className="text-gray-400 mb-2">{assets.logo.description}</p>
                <p className="text-sm text-gray-500">النوع: {assets.logo.type}</p>
              </div>
              <a
                href="/favicon.svg"
                download="mobelmontage-logo.svg"
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                تحميل SVG
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Images Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-orange-500" />
            صور المعرض (Gallery)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.galleryImages.map((image) => (
              <div key={image.id} className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                    {image.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{image.name}</h3>
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors w-full"
                  >
                    <Download className="w-4 h-4" />
                    فتح وتحميل
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Google Ads Images Requirements */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-orange-500" />
            صور Google Ads المطلوبة
          </h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              هذه الصور مطلوبة لحملة Display Remarketing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assets.googleAdsImages.required.map((req, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-orange-400">{req.name}</h3>
                  <p className="text-2xl font-mono my-2">{req.size}</p>
                  <p className="text-sm text-gray-400">{req.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
              <p className="text-yellow-400 text-sm">
                💡 نصيحة: يمكنك استخدام صور المعرض أعلاه وتعديل حجمها باستخدام Canva أو أي محرر صور آخر.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">روابط سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://github.com/Exxd00/keller-montage.de"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 flex items-center gap-3 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">GitHub Repository</h3>
                <p className="text-sm text-gray-400">تحميل المشروع كاملاً</p>
              </div>
            </a>
            <a
              href="/google-ads-import/campaigns.csv"
              download
              className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 flex items-center gap-3 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">ملفات Google Ads</h3>
                <p className="text-sm text-gray-400">تحميل ملفات الحملات CSV</p>
              </div>
            </a>
          </div>
        </section>

        {/* All CSV Files */}
        <section>
          <h2 className="text-xl font-bold mb-4">ملفات Google Ads CSV</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "campaigns.csv",
                "ad-groups.csv",
                "keywords.csv",
                "negative-keywords.csv",
                "responsive-search-ads.csv",
                "sitelinks.csv",
                "callouts.csv",
              ].map((file) => (
                <a
                  key={file}
                  href={`/google-ads-import/${file}`}
                  download
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-center transition-colors"
                >
                  <Download className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">{file}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>هذه الصفحة خاصة ولا تظهر في محركات البحث</p>
          <p className="mt-1">الرابط: /admin/assets</p>
        </div>
      </div>
    </div>
  );
}
