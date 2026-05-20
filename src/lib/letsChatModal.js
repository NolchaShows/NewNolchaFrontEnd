export const LETS_CHAT_OPEN_EVENT = "nolcha:open-lets-chat";

export const openLetsChatModal = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LETS_CHAT_OPEN_EVENT));
};

export const subscribeToLetsChatOpenEvent = (handler) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(LETS_CHAT_OPEN_EVENT, handler);
  return () => window.removeEventListener(LETS_CHAT_OPEN_EVENT, handler);
};
