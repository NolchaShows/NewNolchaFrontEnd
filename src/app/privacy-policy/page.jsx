import { LegalDocumentShell } from "@/components/legal/LegalDocumentShell";
import { PrivacyPolicyFallback } from "@/components/legal/PrivacyPolicyFallback";
import { getPrivacyPolicyContent } from "@/lib/legalPageData";

export const revalidate = 60;

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyContent();

  return (
    <LegalDocumentShell
      title={page.title}
      intro={page.intro}
      content={page.content}
      introClassName="mb-8 text-[24px] text-[#000000B3] 2xl:text-[38px]"
    >
      <PrivacyPolicyFallback />
    </LegalDocumentShell>
  );
}
