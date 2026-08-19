import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { getContactSchema, getContactCopy, validateContactField, type ContactFormData } from "@/lib/contactValidation";
import { useBotProtection, BotProtectionField } from "@/components/BotProtection";

const CONTACT_EMAIL = "info@kuheylanhukuk.com";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const bot = useBotProtection();
  const copy = getContactCopy(language);

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
      document.getElementById(`ch-${first}`)?.focus();
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
    "aria-describedby": errors[name] ? `ch-${name}-error` : undefined,
  });


  return (
    <section id="iletisim" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {t("contact.subtitle")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {t("contact.title")}
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-navy-light border border-border flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground font-semibold mb-1">{t("contact.phone")}</h3>
                <a href="tel:+905352279696" className="text-muted-foreground hover:text-gold transition-colors">
                  +90 535 227 96 96
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-navy-light border border-border flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground font-semibold mb-1">{t("contact.email")}</h3>
                <a href="mailto:info@kuheylanhukuk.com" className="text-muted-foreground hover:text-gold transition-colors">
                  info@kuheylanhukuk.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-navy-light border border-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground font-semibold mb-1">{t("contact.address")}</h3>
                <a href="https://maps.google.com/?q=Burhaniye,+Neşet+Bey+Sk.+NO:12+Kat:3+D:5,+34676+Üsküdar/İstanbul" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors leading-relaxed block">
                  Burhaniye, Neşet Bey Sk. NO:12<br />
                  Kat:3 D:5, 34676<br />
                  Üsküdar/İstanbul, Türkiye
                </a>
              </div>
            </div>

            <div className="rounded overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d29.035!3d41.025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a3c5f8b0f1%3A0x0!2sBurhaniye%2C+Ne%C5%9Fet+Bey+Sk.+No%3A12%2C+34676+%C3%9Csk%C3%BCdar%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Küheylan Hukuk Konum"
                className="w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="relative bg-card border border-border rounded-xl p-8 md:p-10 overflow-hidden">
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <h3 className="font-serif text-2xl text-foreground font-semibold mb-2">{t("contact.form_title")}</h3>
              <p className="text-muted-foreground text-sm mb-8">{t("contact.form_subtitle")}</p>
              
              <form onSubmit={handleSubmit} className="space-y-6 font-['Roboto']">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="ch-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.name")}</label>
                    <Input id="ch-name" name="name" value={formData.name} onChange={handleChange} {...fieldState("name")} placeholder={t("contact.name_placeholder")} maxLength={100} required className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.name && <p id="ch-name-error" role="alert" className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ch-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.email_label")}</label>
                    <Input id="ch-email" name="email" type="email" value={formData.email} onChange={handleChange} {...fieldState("email")} placeholder={t("contact.email_placeholder")} maxLength={255} required className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.email && <p id="ch-email-error" role="alert" className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ch-phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.phone_label")}</label>
                    <Input id="ch-phone" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleChange} {...fieldState("phone")} placeholder={t("contact.phone_placeholder")} maxLength={20} className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.phone ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.phone && <p id="ch-phone-error" role="alert" className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ch-subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.subject")}</label>
                    <Input id="ch-subject" name="subject" value={formData.subject} onChange={handleChange} {...fieldState("subject")} placeholder={t("contact.subject_placeholder")} maxLength={200} required className={`bg-background/50 h-12 text-sm focus:ring-1 transition-all duration-300 ${errors.subject ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                    {errors.subject && <p id="ch-subject-error" role="alert" className="text-destructive text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="ch-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("contact.message")}</label>
                  <Textarea id="ch-message" name="message" value={formData.message} onChange={handleChange} {...fieldState("message")} placeholder={t("contact.message_placeholder")} rows={5} maxLength={2000} required className={`bg-background/50 text-sm focus:ring-1 transition-all duration-300 resize-none ${errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border/80 focus:border-primary/50 focus:ring-primary/20"}`} />
                  <div className="flex items-start justify-between gap-4">
                    {errors.message ? <p id="ch-message-error" role="alert" className="text-destructive text-xs">{errors.message}</p> : <span />}
                    <span className="text-muted-foreground text-xs shrink-0">{copy.remaining(2000 - formData.message.length)}</span>
                  </div>
                </div>

                <BotProtectionField {...bot.fieldProps} idPrefix="ch" />
                <div className="pt-2">
                  <Button type="submit" size="lg" className="gap-3 px-8 h-12 text-sm font-semibold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    <Send className="w-4 h-4" />
                    {t("contact.send")}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
