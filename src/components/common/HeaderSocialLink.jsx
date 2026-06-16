import SocialIcon from "@/components/common/SocialIcon";

const sizeStyles = {
  sm: {
    button:
      "h-10 w-10 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/10",
    icon: "h-[18px] w-[18px]",
  },
  md: {
    button:
      "h-11 w-11 2xl:h-[64px] 2xl:w-[64px] xxl:h-14 xxl:w-14 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/10",
    icon: "h-[18px] w-[18px] 2xl:h-5 2xl:w-5 xxl:h-[22px] xxl:w-[22px]",
  },
};

export default function HeaderSocialLink({
  href,
  platform = "x",
  label = "Follow on X",
  size = "md",
  className = "",
}) {
  if (!href) return null;

  const styles = sizeStyles[size] || sizeStyles.md;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={[
        "inline-flex shrink-0 items-center justify-center transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        styles.button,
        className,
      ].join(" ")}
    >
      <SocialIcon platform={platform} className={styles.icon} />
    </a>
  );
}
