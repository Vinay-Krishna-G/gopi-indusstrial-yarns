const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const whatsappMessages = {
  general:
    "Hi Gopi Industrial Yarns, I'm interested in your Y-Cone Polyester Yarns. Please share the available colours, pricing and details.",

  colour: (colour: string) =>
    `Hi Gopi Industrial Yarns, I'm interested in the ${colour} Y-Cone Polyester Yarn. Please share the price, available quantity and details.`,

  cta: 
    "Hi Gopi Industrial Yarns, I'd like to enquire about your Y-Cone Polyester Yarns. Please share the available colours, pricing and ordering details.",
};

export function openWhatsApp(message: string) {
  if (!WHATSAPP_NUMBER) {
    console.warn("WhatsApp number is not configured in .env");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
