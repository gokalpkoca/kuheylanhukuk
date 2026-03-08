import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, MapPin, Send, ChevronDown, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { careerApplicationSchema } from "@/lib/careerValidation";

const CAREER_EMAIL = "kariyer@kuheylanhukuk.com";

const CareersPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedPosition, setExpandedPosition] = useState<string | null>(null);

  const positions = [
    {
      id: "avukat",
      title: t("career.pos_lawyer"),
      type: t("career.fulltime"),
      location: t("career.istanbul"),
      description: t("career.pos_lawyer_desc"),
      requirements: [
        t("career.pos_lawyer_req1"),
        t("career.pos_lawyer_req2"),
        t("career.pos_lawyer_req3"),
        t("career.pos_lawyer_req4"),
      ],
    },
    {
      id: "stajyer",
      title: t("career.pos_intern"),
      type: t("career.fulltime"),
      location: t("career.istanbul"),
      description: t("career.pos_intern_desc"),
      requirements: [
        t("career.pos_intern_req1"),
        t("career.pos_intern_req2"),
        t("career.pos_intern_req3"),
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = careerApplicationSchema.safeParse(formData);
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
    const mailtoLink = `mailto:${CAREER_EMAIL}?subject=${encodeURIComponent(
      `${t("career.application")}: ${validated.position || t("career.general_application")}`
    )}&body=${encodeURIComponent(
      `${t("contact.name")}: ${validated.name}\n${t("contact.email_label")}: ${validated.email}\n${t("contact.phone_label")}: ${validated.phone || ""}\n${t("career.position_label")}: ${validated.position || t("career.general_application")}\n\n${validated.message}`
    )}`;
    window.location.href = mailtoLink;
    toast({ title: t("contact.redirecting"), description: t("contact.redirect_desc") });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[280px] md:h-[340px] flex items-center justify-center bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,8%,18%)] via-[hsl(0,8%,18%)]/95 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark-surface-foreground font-bold">
            {t("career.title")}
          </h1>
          <div className="w-16 h-px bg-muted-foreground/40 mx-auto mt-6" />
        </motion.div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Briefcase className="w-8 h-8" />, title: t("career.why1_title"), desc: t("career.why1_desc") },
              { icon: <GraduationCap className="w-8 h-8" />, title: t("career.why2_title"), desc: t("career.why2_desc") },
              { icon: <Users className="w-8 h-8" />, title: t("career.why3_title"), desc: t("career.why3_desc") },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-muted border border-border flex items-center justify-center mx-auto mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-serif text-base text-foreground font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("career.positions_title")}
          </h2>

          <div className="space-y-4">
            {positions.map((pos, i) => (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPosition(expandedPosition === pos.id ? null : pos.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <h3 className="font-serif text-lg text-foreground font-semibold">{pos.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pos.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {pos.location}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${expandedPosition === pos.id ? "rotate-180" : ""}`} />
                </button>
                {expandedPosition === pos.id && (
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <p className="text-muted-foreground text-sm mb-4">{pos.description}</p>
                    <h4 className="text-sm font-semibold text-foreground mb-2">{t("career.requirements")}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                      {pos.requirements.map((req, j) => (
                        <li key={j}>{req}</li>
                      ))}
                    </ul>
                    <Button
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, position: pos.title }));
                        document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="gap-2 text-xs uppercase tracking-wider"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {t("career.apply_now")}
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-2">
                {t("career.form_title")}
              </h2>
              <p className="text-muted-foreground text-center text-sm mb-10">
                {t("career.form_subtitle")}
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
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("career.position_label")}</label>
                    <Input name="position" value={formData.position} onChange={handleChange} placeholder={t("career.position_placeholder")} maxLength={200} className="bg-background/50 border-border/80 h-12 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300" />
                    {errors.position && <p className="text-destructive text-xs mt-1">{errors.position}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("career.cover_letter")}</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder={t("career.cover_letter_placeholder")} rows={6} maxLength={2000} required className="bg-background/50 border-border/80 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <div className="text-center pt-2">
                  <Button type="submit" size="lg" className="gap-3 px-10 h-12 text-sm font-semibold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    <Send className="w-4 h-4" />
                    {t("career.send_application")}
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

export default CareersPage;