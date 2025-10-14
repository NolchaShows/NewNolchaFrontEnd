'use client'
import { usePathname } from 'next/navigation';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const hideNavFooter = pathname === '/sign-in' || pathname === '/dashboard' || pathname === "/gmail/template/1" || pathname === "/gmail/template/2";
  const hideFooter = pathname === '/inscribing-miami';

  return (
    <>
      {!hideNavFooter && (
        <div className="bg-[var(--surface-color)]">
          <Navbar/>
        </div>
      )}
      {children}
      {!hideNavFooter && !hideFooter && (
        <div className="bg-[var(--surface-color2)]">
          <Footer/>
        </div>
      )}
    </>
  );
}