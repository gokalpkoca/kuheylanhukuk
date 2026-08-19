import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Navigation } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getContactSchema, getContactCopy, validateContactField, type ContactFormData } from "@/lib/contactValidation";
import { useBotProtection, BotProtectionField } from "@/components/BotProtection";

const CONTACT_EMAIL = "info@kuheylanhukuk.com";

const ContactPage = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const copy = getContactCopy(language);

  const ADDRESS = "Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul, Türkiye";
  const mapOptions = [
    { name: "Google Maps", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}` },
    { name: "Apple Maps", url: `https://maps.apple.com/?q=${encodeURIComponent(ADDRESS)}` },
    { name: "Yandex Haritalar", url: `https://yandex.com/maps/?text=${encodeURIComponent(ADDRESS)}` },
  ];

  const bot = useBotProtection();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = getContactSchema(language).safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] && !fieldErrors[err.path[0] as string]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setTouched({ name: true, email: true, phone: true, subject: true, message: true });
      const first = Object.keys(fieldErrors)[0];
      toast({
        variant: "destructive",
        title: copy.summary(Object.keys(fieldErrors).length),
        description: fieldErrors[first],
      });
      document.getElementById(`cp-${first}`)?.focus();
      return;
    }
    if (!bot.verify()) return;
    setErrors({});
    const validated = result.data;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(validated.subject)}&body=${encodeURIComponent(
      `${t("contact.name")}: ${validated.name}\n${t("contact.email_label")}: ${validated.email}\n${t("contact.phone_label")}: ${validated.phone || ""}\n\n${validated.message}`
    )}`;
    window.location.href = mailtoLink;
    toast({ title: t("contact.redirecting"), description: t("contact.redirect_desc") });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateContactField(language, name as keyof ContactFormData, value) }));
    } else if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateContactField(language, name as keyof ContactFormData, value) }));
  };

  const fieldState = (name: string) => ({
    onBlur: handleBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `cp-${name}-error` : undefined,
  });


  const contactCards = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: t("contact.phone"),
      detail: "+90 535 227 96 96",
      href: "tel:+905352279696",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t("contact.email"),
      detail: "info@kuheylanhukuk.com",
      href: "mailto:info@kuheylanhukuk.com",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t("contact.address"),
      detail: ADDRESS,
      onClick: () => setMapDialogOpen(true),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="İletişim | Küheylan Hukuk Bürosu"
        description="Küheylan Hukuk Bürosu ile iletişime geçin. Üsküdar / İstanbul ofisimiz, telefon, e-posta ve iletişim formu."
        path="/iletisim"
      />
      <Navbar />

      <PageHeader eyebrow="Küheylan Hukuk" title={t("contact_page.title")} />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    className="block bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted border border-border flex items-center justify-center mx-auto mb-5 text-primary">
                      {card.icon}
                    </div>
                    <h3 className="font-serif text-xl text-foreground font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.detail}</p>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={card.onClick}
                    className="w-full bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted border border-border flex items-center justify-center mx-auto mb-5 text-primary">
                      {card.icon}
                    </div>
                    <h3 className="font-serif text-xl text-foreground font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.detail}</p>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-8">
              {t("contact.map_title")}
            </h2>
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d29.035!3d41.025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a3c5f8b0f1%3A0x0!2sBurhaniye%2C+Ne%C5%9Fet+Bey+Sk.+No%3A12%2C+34676+%C3%9Csk%C3%BCdar%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Küheylan Hukuk Konum"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 overflow-hidden">
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-2">
                {t("contact_page.reach_us")}
              </h2>
              <p className="text-muted-foreground text-center text-sm mb-10">
                {t("contact.form_subtitle")}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 font-['Roboto']">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="cp-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.name")}</label>
                    <Input id="cp-name" name="name" value={formData.name} onChange={handleChange} {...fieldState("name")} placeholder={t("contact.name_placeholder")} maxLength={100} required className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.name && <p id="cp-name-error" role="alert" className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cp-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.email_label")}</label>
                    <Input id="cp-email" name="email" type="email" value={formData.email} onChange={handleChange} {...fieldState("email")} placeholder={t("contact.email_placeholder")} maxLength={255} required className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.email && <p id="cp-email-error" role="alert" className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cp-phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.phone_label")}</label>
                    <Input id="cp-phone" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleChange} {...fieldState("phone")} placeholder={t("contact.phone_placeholder")} maxLength={20} className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.phone ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.phone && <p id="cp-phone-error" role="alert" className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cp-subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.subject")}</label>
                    <Input id="cp-subject" name="subject" value={formData.subject} onChange={handleChange} {...fieldState("subject")} placeholder={t("contact.subject_placeholder")} maxLength={200} required className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.subject ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.subject && <p id="cp-subject-error" role="alert" className="text-destructive text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="cp-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.message")}</label>
                  <Textarea id="cp-message" name="message" value={formData.message} onChange={handleChange} {...fieldState("message")} placeholder={t("contact.message_placeholder")} rows={6} maxLength={2000} required className={`bg-background/50 text-sm focus:ring-1 transition-all duration-300 resize-none ${errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                  <div className="flex items-start justify-between gap-4">
                    {errors.message ? <p id="cp-message-error" role="alert" className="text-destructive text-xs">{errors.message}</p> : <span />}
                    <span className="text-muted-foreground text-xs shrink-0">{copy.remaining(2000 - formData.message.length)}</span>
                  </div>
                </div>

                <BotProtectionField {...bot.fieldProps} idPrefix="cp" />
                <div className="text-center pt-2">
                  <Button type="submit" size="lg" className="gap-3 px-10 h-12 text-sm font-semibold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    <Send className="w-4 h-4" />
                    {t("contact.send")}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Harita Uygulaması Seçin
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            {mapOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted hover:border-primary/50 transition-all duration-200"
                onClick={() => setMapDialogOpen(false)}
              >
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{option.name}</span>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactPage;
