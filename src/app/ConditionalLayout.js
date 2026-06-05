import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LetsChatModalHost from "@/components/Modals/LetsChatModalHost";
import {
  getCharityPages,
  getNavigationMenu,
  getHomePageForNavigation,
} from "@/lib/strapi";
import { getExperiencesNavDropdownItems } from "@/lib/experiencesIndexData";

export default async function ConditionalLayout({ children }) {
  const [exNavRes, chRes, navRes, homeRes] = await Promise.allSettled([
    getExperiencesNavDropdownItems(),
    getCharityPages(),
    getNavigationMenu(),
    getHomePageForNavigation(),
  ]);

  const initialNavData = {
    experienceCategories: exNavRes.status === "fulfilled" ? exNavRes.value : null,
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
      <LetsChatModalHost />
    </>
  );
}