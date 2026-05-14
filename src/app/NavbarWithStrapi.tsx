import Navbar from "@/components/common/Navbar";
import {
  getCharityPages,
  getExperiencePages,
  getHomePageForNavigation,
  getNavigationMenu,
} from "@/lib/strapi";

export default async function NavbarWithStrapi() {
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

  return <Navbar initialNavData={initialNavData} />;
}
