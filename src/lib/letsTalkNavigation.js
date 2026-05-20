import { dispatchModalCloseEvent } from "@/lib/modalEvents";
import { openLetsChatModal } from "@/lib/letsChatModal";

/**
 * Scroll to the home contact section when `#contact` exists on the current page.
 * Matches navbar offset logic (`data-navbar="main"`).
 * @returns {boolean} true if an element with id="contact" was found and scrolled to
 */
export function scrollToContactSection() {
  if (typeof document === "undefined") return false;

  const el = document.getElementById("contact");
  if (!el) return false;

  const nav = document.querySelector('[data-navbar="main"]');
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const y =
    el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

/**
 * Same behavior as the header "Lets Talk" button: close any open modals,
 * then open the Let's Chat contact modal.
 */
export function navigateToContactLikeLetsTalk() {
  dispatchModalCloseEvent();
  openLetsChatModal();
}
