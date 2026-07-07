import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LetsChatModalHost from "@/components/Modals/LetsChatModalHost";
import {
  getCharityPages,
  getFooterData,
  getNavigationMenu,
  getHomePageForNavigation,
} from "@/lib/strapi";
import { getExperiencesNavDropdownItems } from "@/lib/experiencesIndexData";
import { mapStrapiDataToFooterContent } from "@/utils/footerUtils";

export default async function ConditionalLayout({ children }) {
  const [exNavRes, chRes, navRes, homeRes, footerRes] = await Promise.allSettled([
    getExperiencesNavDropdownItems(),
    getCharityPages(),
    getNavigationMenu(),
    getHomePageForNavigation(),
    getFooterData(),
  ]);

  const initialNavData = {
    experienceCategories: exNavRes.status === "fulfilled" ? exNavRes.value : null,
    charityPages: chRes.status === "fulfilled" ? chRes.value : null,
    navigationMenu: navRes.status === "fulfilled" ? navRes.value : null,
    homePageRes: homeRes.status === "fulfilled" ? homeRes.value : null,
  };

  const initialFooterContent =
    footerRes.status === "fulfilled" && footerRes.value
      ? mapStrapiDataToFooterContent(footerRes.value)
      : null;

  return (
    <>
      <div className="bg-[var(--surface-color)]">
        <Navbar
          initialNavData={initialNavData}
          footerContent={initialFooterContent}
        />
      </div>
      <div>
        {children}
      </div>
      <Footer initialContent={initialFooterContent} />
      <LetsChatModalHost />
    </>
  );
}
