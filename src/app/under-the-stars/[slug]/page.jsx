import { notFound } from "next/navigation";
import ArtistProfileTemplate from "@/components/under-the-stars/ArtistProfileTemplate";
import { underTheStarsData } from "@/data/underTheStarsData";

export async function generateStaticParams() {
  return underTheStarsData.artists.map((artist) => ({
    slug: artist.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const artist = underTheStarsData.artists.find((a) => a.id === resolvedParams.slug);

  if (!artist) {
    return {
      title: "Artist Not Found | Nolcha Shows",
    };
  }

  return {
    title: `${artist.name} | Under The Stars · Nolcha Shows`,
    description: artist.shortDescription || artist.bio,
    openGraph: {
      title: `${artist.name} | Under The Stars · Nolcha Shows`,
      description: artist.shortDescription || artist.bio,
      images: [
        {
          url: artist.featuredArtwork?.image || artist.portrait,
          alt: artist.name,
        },
      ],
    },
  };
}

export default async function ArtistProfilePage({ params }) {
  const resolvedParams = await params;
  const artist = underTheStarsData.artists.find((a) => a.id === resolvedParams.slug);

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ArtistProfileTemplate artist={artist} />
    </main>
  );
}
