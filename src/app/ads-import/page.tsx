"use client";

import { Download, FileSpreadsheet, CheckCircle, ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";

const files = [
  {
    name: "campaigns.csv",
    description: "الحملات الأساسية (4 حملات)",
    size: "1 KB",
  },
  {
    name: "ad-groups.csv",
    description: "مجموعات الإعلانات (10 مجموعات)",
    size: "1 KB",
  },
  {
    name: "keywords.csv",
    description: "الكلمات المفتاحية (35+ كلمة)",
    size: "4 KB",
  },
  {
    name: "negative-keywords.csv",
    description: "الكلمات السلبية (35+ كلمة)",
    size: "2 KB",
  },
  {
    name: "responsive-search-ads.csv",
    description: "إعلانات البحث المتجاوبة (8 إعلانات)",
    size: "8 KB",
  },
  {
    name: "sitelinks.csv",
    description: "روابط الموقع Extensions (14 رابط)",
    size: "2 KB",
  },
  {
    name: "callouts.csv",
    description: "Callout Extensions (26 عنصر)",
    size: "1 KB",
  },
];

const steps = [
  {
    number: 1,
    title: "تحميل Google Ads Editor",
    description: "حمّل البرنامج المجاني من Google",
    link: "https://ads.google.com/intl/de_de/home/tools/ads-editor/",
    linkText: "تحميل Google Ads Editor",
  },
  {
    number: 2,
    title: "تحميل ملفات CSV",
    description: "حمّل جميع الملفات من هذه الصفحة",
    link: null,
    linkText: null,
  },
  {
    number: 3,
    title: "فتح Google Ads Editor",
    description: "افتح البرنامج وسجل دخول بحساب Google Ads الخاص بك",
    link: null,
    linkText: null,
  },
  {
    number: 4,
    title: "استيراد الملفات",
    description: "اذهب إلى Account > Import > From file ثم اختر الملفات",
    link: null,
    linkText: null,
  },
  {
    number: 5,
    title: "مراجعة ونشر",
    description: "راجع التغييرات ثم اضغط Post لنشر الحملات",
    link: null,
    linkText: null,
  },
];

export default function AdsImportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
              <FileSpreadsheet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              استيراد حملات Google Ads
            </h1>
            <p className="text-xl text-gray-600" dir="rtl">
              ملفات CSV جاهزة للاستيراد في Google Ads Editor
              <br />
              <span className="text-orange-600 font-medium">4 حملات كاملة + 35 كلمة مفتاحية + 8 إعلانات</span>
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8" dir="rtl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-800 mb-2">قبل البدء - مهم!</h3>
                <ul className="text-amber-900 space-y-1 text-sm">
                  <li>• تأكد أن لديك حساب Google Ads نشط</li>
                  <li>• أضف معلومات الدفع (بطاقة ائتمان) قبل النشر</li>
                  <li>• راجع الروابط في الملفات وغيّرها لموقعك الفعلي</li>
                  <li>• غيّر رقم الهاتف للرقم الصحيح</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900" dir="rtl">
              خطوات الاستيراد
            </h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4" dir="rtl">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm mt-1"
                      >
                        {step.linkText}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Files */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900" dir="rtl">
              تحميل الملفات
            </h2>
            <div className="grid gap-4">
              {files.map((file) => (
                <a
                  key={file.name}
                  href={`/google-ads-import/${file.name}`}
                  download
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-xl border border-gray-200 hover:border-orange-300 transition-all group"
                >
                  <div className="flex items-center gap-4" dir="rtl">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <FileSpreadsheet className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{file.name}</h3>
                      <p className="text-sm text-gray-500">{file.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{file.size}</span>
                    <Download className="w-5 h-5 text-orange-500 group-hover:text-orange-600" />
                  </div>
                </a>
              ))}
            </div>

            {/* Download All Button */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-4" dir="rtl">
                أو حمّل جميع الملفات مرة واحدة:
              </p>
              <a
                href="/google-ads-import/all-files.zip"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                تحميل الكل (ZIP)
              </a>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900" dir="rtl">
              ماذا يتضمن؟
            </h2>
            <div className="grid md:grid-cols-2 gap-6" dir="rtl">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800">4 حملات:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>حملة Möbelmontage (تركيب الأثاث)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>حملة Küchenmontage (تركيب المطابخ)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>حملة IKEA Montage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>حملة Remarketing (Display)</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800">المحتوى:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>35+ كلمة مفتاحية (Exact & Phrase)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>35+ كلمة سلبية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>8 إعلانات Responsive Search</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>14 Sitelink Extension</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>26 Callout Extension</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Budget Info */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4" dir="rtl">
              الميزانية المقترحة
            </h2>
            <div className="grid md:grid-cols-3 gap-6" dir="rtl">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-bold text-lg">الأسبوع 1-2</h3>
                <p className="text-3xl font-bold">€20</p>
                <p className="text-sm opacity-80">يومياً</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-bold text-lg">الأسبوع 3-4</h3>
                <p className="text-3xl font-bold">€30</p>
                <p className="text-sm opacity-80">يومياً</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-bold text-lg">الأسبوع 5+</h3>
                <p className="text-3xl font-bold">€50</p>
                <p className="text-sm opacity-80">يومياً</p>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              href="/ads"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← العودة لصفحة تصاميم الإعلانات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
