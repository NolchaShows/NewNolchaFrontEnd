import {
  getDesignerPageData,
  getDesigners,
} from "@/lib/strapi";
import {
  transformDesignerData,
  transformDesignersListData,
} from "@/utils/designerPageUtils";
import DesignersListingPage from "@/components/designers/DesignersListingPage";

export const revalidate = 60;

export const metadata = {
  title: "Designers | Nolcha",
};

export default async function Page() {
  const [pageRes, designersRes] = await Promise.all([
    getDesignerPageData(),
    getDesigners(),
  ]);

  const designerData = pageRes?.data
    ? transformDesignerData(pageRes.data.attributes || pageRes.data)
    : null;

  const designers =
    designersRes?.data && Array.isArray(designersRes.data)
      ? transformDesignersListData(designersRes.data)
      : [];

  return (
    <DesignersListingPage designerData={designerData} designers={designers} />
  );
}
