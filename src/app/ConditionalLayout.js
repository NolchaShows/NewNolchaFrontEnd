import { Suspense } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import NavbarWithStrapi from "./NavbarWithStrapi";

export default function ConditionalLayout({ children }) {
  return (
    <>
      <div className="bg-[var(--surface-color)]">
        <Suspense fallback={<Navbar initialNavData={null} />}>
          <NavbarWithStrapi />
        </Suspense>
      </div>
      <div>{children}</div>
      <Footer />
    </>
  );
}