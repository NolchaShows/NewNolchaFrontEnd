import {
  getFeaturedArtists,
  getFeaturedArtistsPageData,
} from "@/lib/strapi";
import {
  transformFeaturedArtistsListData,
  transformFeaturedArtistsPageData,
} from "@/utils/featuredArtistUtils";
import FeaturedArtistsListingPage from "@/components/featured-artists/FeaturedArtistsListingPage";

export const revalidate = 60;

export const metadata = {
  title: "Featured Artists | Nolcha",
};

export default async function Page() {
  const [artistsRes, pageRes] = await Promise.all([
    getFeaturedArtists(),
    getFeaturedArtistsPageData(),
  ]);

  const featuredArtists =
    artistsRes?.data && Array.isArray(artistsRes.data)
      ? transformFeaturedArtistsListData(artistsRes.data)
      : [];

  const featuredPage = pageRes?.data
    ? transformFeaturedArtistsPageData(pageRes.data.attributes || pageRes.data)
    : transformFeaturedArtistsPageData(null);

  return (
    <FeaturedArtistsListingPage
      featuredArtists={featuredArtists}
      featuredPage={featuredPage}
    />
  );
}
