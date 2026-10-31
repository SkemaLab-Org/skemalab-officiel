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
      className="group fixed bottom-5 end-5 z-[100] flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-[#04231a] shadow-[0_10px_30px_rgba(37,211,102,0.32)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-7 sm:end-7"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
