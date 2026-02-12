declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function gtmEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
