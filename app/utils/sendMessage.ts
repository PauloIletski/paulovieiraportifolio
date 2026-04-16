import type { CartItem } from "@/app/types/cartTypes";

const MOBILE_USER_AGENT_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export default function handleSendMessage(items: CartItem[]) {
  if (items.length === 0) {
    window.alert("Seu carrinho está vazio!");
    return;
  }

  const whatsappNumber = "5517981048717";
  const message = `Olá! Quero trocar uma ideia sobre ${items
    .map((item) =>
      item.quantity > 1 ? `${item.name} (${item.quantity}x)` : item.name
    )
    .join(", ")}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  const isMobileDevice = MOBILE_USER_AGENT_REGEX.test(navigator.userAgent);

  if (isMobileDevice) {
    window.location.href = whatsappUrl;
    return;
  }

  const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  if (!newWindow) {
    window.location.href = whatsappUrl;
  }
}
