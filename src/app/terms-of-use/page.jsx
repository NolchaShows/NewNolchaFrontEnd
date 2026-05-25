import { LegalDocumentShell } from "@/components/legal/LegalDocumentShell";
import { TermsOfUseFallback } from "@/components/legal/TermsOfUseFallback";
import { getTermsOfUseContent } from "@/lib/legalPageData";

export const revalidate = 60;

export default async function TermsOfUsePage() {
  const page = await getTermsOfUseContent();

  return (
    <LegalDocumentShell title={page.title} intro={page.intro} content={page.content}>
      <TermsOfUseFallback />
    </LegalDocumentShell>
  );
}
