import "./globals.css";
import { Outfit } from "next/font/google";
import Header from "./_components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "File Share",
  description: "Upload, Save and Share files easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
