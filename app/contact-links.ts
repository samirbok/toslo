export function createWhatsAppUrl(request: string) {
  const message = `Hi Toslo! I came from your website. ${request}`;
  return `https://wa.me/212664967161?text=${encodeURIComponent(message)}`;
}

export const deliveryWhatsAppUrl = createWhatsAppUrl("I'd like to request a delivery.");
export const businessWhatsAppUrl = createWhatsAppUrl("I'd like to discuss deliveries for my business.");
export const contactWhatsAppUrl = createWhatsAppUrl("I have a question.");

export const deliveryPhone = "0664967161";
export const deliveryPhoneUrl = "tel:+212664967161";
export const instagramUrl = "https://www.instagram.com/toslo_delivery/";
