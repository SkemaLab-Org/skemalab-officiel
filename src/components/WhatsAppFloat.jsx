import { contactInfo } from "@/data/content";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
    "Bonjour Skemalab, je souhaite en savoir plus sur vos services.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Skemalab sur WhatsApp"
      className="group fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_14px_32px_rgba(37,211,102,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-[26px] w-[26px] transition-transform duration-300 group-hover:scale-105" />
    </a>
  );
}
