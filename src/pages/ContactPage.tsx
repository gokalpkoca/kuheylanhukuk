import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactSchema } from "@/lib/contactValidation";

const CONTACT_EMAIL = "info@kuheylanhukuk.com";

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

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
      detail: "Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul, Türkiye",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[280px] md:h-[340px] flex items-center justify-center bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,8%,18%)] via-[hsl(0,8%,18%)]/95 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark-surface-foreground font-bold">
            {t("contact_page.title")}
          </h1>
          <div className="w-16 h-px bg-muted-foreground/40 mx-auto mt-6" />
        </motion.div>
      </section>

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
                  <div className="bg-card border border-border rounded-lg p-8 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-muted border border-border flex items-center justify-center mx-auto mb-5 text-primary">
                      {card.icon}
                    </div>
                    <h3 className="font-serif text-xl text-foreground font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.detail}</p>
                  </div>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.name")}</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.name_placeholder")} maxLength={100} required className="bg-background/50 border-border/80 h-12 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300" />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.email_label")}</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.email_placeholder")} maxLength={255} required className="bg-background/50 border-border/80 h-12 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300" />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.phone_label")}</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder={t("contact.phone_placeholder")} maxLength={20} className="bg-background/50 border-border/80 h-12 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300" />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.subject")}</label>
                    <Input name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contact.subject_placeholder")} maxLength={200} required className="bg-background/50 border-border/80 h-12 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300" />
                    {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.message")}</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder={t("contact.message_placeholder")} rows={6} maxLength={2000} required className="bg-background/50 border-border/80 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
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
    </div>
  );
};

export default ContactPage;
