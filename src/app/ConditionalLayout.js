import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  getExperiencePages,
  getCharityPages,
  getNavigationMenu,
  getHomePageForNavigation,
} from "@/lib/strapi";

export default async function ConditionalLayout({ children }) {
  const [exRes, chRes, navRes, homeRes] = await Promise.allSettled([
    getExperiencePages(),
    getCharityPages(),
    getNavigationMenu(),
    getHomePageForNavigation(),
  ]);

  const initialNavData = {
    experiencePages: exRes.status === "fulfilled" ? exRes.value : null,
    charityPages: chRes.status === "fulfilled" ? chRes.value : null,
    navigationMenu: navRes.status === "fulfilled" ? navRes.value : null,
    homePageRes: homeRes.status === "fulfilled" ? homeRes.value : null,
  };

  return (
    <>
      <div className="bg-[var(--surface-color)]">
        <Navbar initialNavData={initialNavData} />
      </div>
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}