import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="">
     <div className="bg-[var(--surface-color2)]">
          <Hero/>
          <About/>
     </div>
    </div>
  );
}
