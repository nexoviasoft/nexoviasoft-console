import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "NexoviaSoft Console | HR, Recruitment & Project Management",
  description: "Enterprise dashboard for NexoviaSoft - Managing Projects, HR, Recruitment, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.className} ${baiJamjuree.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
