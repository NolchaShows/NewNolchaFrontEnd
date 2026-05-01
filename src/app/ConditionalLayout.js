import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function ConditionalLayout({ children }) {

  return (
    <>
      <div className="bg-[var(--surface-color)]">
        <Navbar />
      </div>
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}