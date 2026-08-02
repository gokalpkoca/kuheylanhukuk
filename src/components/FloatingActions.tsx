import { useState } from "react";
import { Phone, MessageCircle, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE = "+905352279696";
const WHATSAPP = "905352279696";

const labels = {
  TR: { open: "İletişim seçenekleri", call: "Bizi arayın", wa: "WhatsApp'tan yazın" },
  EN: { open: "Contact options", call: "Call us", wa: "Message on WhatsApp" },
  AR: { open: "خيارات الاتصال", call: "اتصل بنا", wa: "راسلنا على واتساب" },
  RU: { open: "Способы связи", call: "Позвонить", wa: "Написать в WhatsApp" },
} as const;

const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const l = labels[(language as keyof typeof labels)] ?? labels.TR;

  // Radial positions (up and up-left)
  const items = [
    {
      key: "call",
      href: `tel:${PHONE}`,
      label: l.call,
      Icon: Phone,
      style: { transform: open ? "translate(0, -68px)" : "translate(0,0)" },
      delay: "0ms",
    },
    {
      key: "wa",
      href: `https://wa.me/${WHATSAPP}`,
      label: l.wa,
      Icon: MessageCircle,
      style: { transform: open ? "translate(-48px, -48px)" : "translate(0,0)" },
      delay: "60ms",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative w-14 h-14">
        {items.map(({ key, href, label, Icon, style, delay }) => (
          <a
            key={key}
            href={href}
            target={key === "wa" ? "_blank" : undefined}
            rel={key === "wa" ? "noopener noreferrer" : undefined}
            aria-label={label}
            tabIndex={open ? 0 : -1}
            style={{ ...style, transitionDelay: delay }}
            className={`absolute inset-0 m-auto flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border shadow-lg text-primary transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground hover:border-primary ${
              open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
            }`}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={l.open}
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Plus className={`w-6 h-6 transition-transform duration-300 ${open ? "rotate-[135deg]" : ""}`} />
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;
