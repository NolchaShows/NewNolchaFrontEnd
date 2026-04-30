export const MODAL_CLOSE_EVENT = "nolcha:close-modals";

export const dispatchModalCloseEvent = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(MODAL_CLOSE_EVENT));
};

export const subscribeToModalCloseEvent = (handler) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(MODAL_CLOSE_EVENT, handler);
  return () => window.removeEventListener(MODAL_CLOSE_EVENT, handler);
};
