import { useState } from "react";
import { Phone, MessageCircle, Info, X, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE = "+905352279696";
const WHATSAPP = "905352279696";
const EMAIL = "av.mdkuheylan@hotmail.com";

const labels = {
  TR: { open: "İletişim seçenekleri", call: "Bizi arayın", wa: "WhatsApp'tan yazın", mail: "E-posta gönderin" },
  EN: { open: "Contact options", call: "Call us", wa: "Message on WhatsApp", mail: "Send an email" },
  AR: { open: "خيارات الاتصال", call: "اتصل بنا", wa: "راسلنا على واتساب", mail: "أرسل بريدًا إلكترونيًا" },
  RU: { open: "Способы связи", call: "Позвонить", wa: "Написать в WhatsApp", mail: "Написать на e-mail" },
} as const;

const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const l = labels[(language as keyof typeof labels)] ?? labels.TR;

  // Radial positions (up, up-left diagonal, left)
  const items = [
    {
      key: "call",
      href: `tel:${PHONE}`,
      label: l.call,
      Icon: Phone,
      style: { transform: open ? "translate(0, -72px)" : "translate(0,0)" },
      delay: "0ms",
    },
    {
      key: "wa",
      href: `https://wa.me/${WHATSAPP}`,
      label: l.wa,
      Icon: MessageCircle,
      style: { transform: open ? "translate(-51px, -51px)" : "translate(0,0)" },
      delay: "60ms",
    },
    {
      key: "mail",
      href: `mailto:${EMAIL}`,
      label: l.mail,
      Icon: Mail,
      style: { transform: open ? "translate(-72px, 0)" : "translate(0,0)" },
      delay: "120ms",
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
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 active:scale-95"
        >
          {/* Attention pulse rings */}
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-60" />
          <span className="absolute -inset-1.5 rounded-full border border-primary/40 animate-pulse" />

          <Info
            className={`absolute w-6 h-6 transition-all duration-300 ${
              open ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
            }`}
          />
          <X
            className={`absolute w-6 h-6 transition-all duration-300 ${
              open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
            }`}
          />
        </button>

        {/* Desktop label hint */}
        <span
          className={`hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-medium tracking-wide bg-card border border-border rounded-lg shadow-md text-foreground transition-all duration-300 pointer-events-none ${
            open ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
          }`}
        >
          {l.open}
        </span>
      </div>
    </div>
  );
};

export default FloatingActions;
