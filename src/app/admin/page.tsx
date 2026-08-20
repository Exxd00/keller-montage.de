"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Unlock, Image, FileText, BarChart3, Settings, ExternalLink } from "lucide-react";

const ADMIN_PASSWORD = "Leavemealone2003+";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated (session)
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
    } else {
      setError("Falsches Passwort");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <>
        <head>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
          <meta name="googlebot" content="noindex, nofollow" />
          <title>Admin - Login</title>
        </head>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Bereich
            </h1>
            <p className="text-gray-400 text-center mb-6">
              Bitte geben Sie das Passwort ein
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Unlock className="w-5 h-5" />
                Anmelden
              </button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-6">
              Diese Seite ist nicht indiziert
            </p>
          </div>
        </div>
      </>
    );
  }

  // Admin dashboard
  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Admin Dashboard</title>
      </head>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">Möbelmontage Nürnberg</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
            >
              Abmelden
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Quick Stats */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Schnellzugriff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Assets Link */}
              <Link
                href="/admin/assets"
                className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-6 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center group-hover:bg-orange-600/30 transition-colors">
                    <Image className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Assets Download</h3>
                    <p className="text-sm text-gray-400">Bilder & Logos</p>
                  </div>
                </div>
              </Link>

              {/* Banners Link */}
              <Link
                href="/admin/banners"
                className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-6 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Banner Manager</h3>
                    <p className="text-sm text-gray-400">إعلانات و Banner</p>
                  </div>
                </div>
              </Link>

              {/* Google Analytics Link */}
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-6 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                    <BarChart3 className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold flex items-center gap-2">
                      Google Analytics
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </h3>
                    <p className="text-sm text-gray-400">إحصائيات الموقع</p>
                  </div>
                </div>
              </a>
            </div>
          </section>

          {/* Website Info */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">معلومات الموقع</h2>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">الموقع</h3>
                  <a
                    href="https://keller-montage.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
                  >
                    keller-montage.de
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">GitHub</h3>
                  <a
                    href="https://github.com/Exxd00/keller-montage.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
                  >
                    Repository
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CSV Files Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">ملفات Google Ads</h2>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <p className="text-gray-400 mb-4 text-sm">
                ملفات CSV جاهزة للاستيراد في Google Ads Editor
              </p>
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
                    className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-center text-sm transition-colors"
                  >
                    {file}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-8 py-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
            <p>هذه الصفحة خاصة ولا تظهر في محركات البحث</p>
          </div>
        </footer>
      </div>
    </>
  );
}
