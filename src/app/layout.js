import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import AppLayout from "@/components/layout/AppLayout";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SquadLog Console | HR, Recruitment & Project Management",
  description: "Enterprise dashboard for SquadLog - Managing Projects, HR, Recruitment, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.className} ${baiJamjuree.variable} antialiased`}
      >
        <StoreProvider>
          <AppLayout>
            <div className="flex flex-col py-5 min-h-screen">
              {children}
            </div>
          </AppLayout>
        </StoreProvider>
      </body>

    </html>
  );
}
