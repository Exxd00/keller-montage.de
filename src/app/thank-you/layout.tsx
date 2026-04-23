import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vielen Dank | KELLER Montage",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
