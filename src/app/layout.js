import "./globals.css";
import { Orbitron } from "next/font/google";
import Navbar from "@/components/common/Navbar";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], 
  variable: "--font-orbitron",
});


export const metadata = {
  title: "Nolcha-Inscribing Miami",
  description: "Miami Art Week's Largest Art + Tech Culture Convergence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body>
        <div className="bg-[var(--surface-color)]">
          <Navbar/>
        </div>
        {children}
      </body>
    </html>
  );
}