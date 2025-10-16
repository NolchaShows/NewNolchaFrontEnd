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
  openGraph: {
    title: "Nolcha-Inscribing Miami",
    description: "Miami Art Week's Largest Art + Tech Culture Convergence",
    images: [
      {
        url: "/meta-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nolcha Inscribing Miami - Miami Art Week's Largest Art + Tech Culture Convergence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nolcha-Inscribing Miami",
    description: "Miami Art Week's Largest Art + Tech Culture Convergence",
    images: ["/meta-image.jpg"],
  },
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