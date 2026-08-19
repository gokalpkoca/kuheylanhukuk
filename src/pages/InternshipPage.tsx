import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Scale,
  BookOpen,
  CalendarDays,
  Users,
  FileCheck2,
  Send,
  Paperclip,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { careerApplicationSchema } from "@/lib/careerValidation";
import { supabase } from "@/integrations/supabase/client";

const ALLOWED_CV_EXT = ["pdf", "doc", "docx"];
const MAX_CV_SIZE = 5 * 1024 * 1024;

const InternshipPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const programs = [
    { id: "1", Icon: Scale },
    { id: "2", Icon: BookOpen },
    { id: "3", Icon: GraduationCap },
  ];

  const gains = ["1", "2", "3", "4"];

  const timeline = [
    { id: "1", Icon: CalendarDays },
    { id: "2", Icon: FileCheck2 },
    { id: "3", Icon: Users },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return setCvFile(null);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_CV_EXT.includes(ext)) {
      setCvFile(null);
      setErrors((prev) => ({ ...prev, cv: t("career.cv_error_type") }));
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setCvFile(null);
      setErrors((prev) => ({ ...prev, cv: t("career.cv_error_size") }));
      return;
    }
    setErrors((prev) => ({ ...prev, cv: "" }));
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    setSubmitting(true);
    const validated = result.data;

    let cvPath: string | null = null;
    if (cvFile) {
      const ext = cvFile.name.split(".").pop()?.toLowerCase() ?? "pdf";
      const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("career-cvs")
        .upload(safeName, cvFile, { contentType: cvFile.type || undefined });
      if (uploadError) {
        setSubmitting(false);
        toast({
          title: "Dosya yüklenemedi",
          description: "CV dosyanız yüklenemedi. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
        return;
      }
      cvPath = safeName;
    }

    const { error } = await supabase.from("career_applications").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || null,
      position: `Staj — ${validated.position || t("intern.form_default_position")}`,
      message: validated.message,
      cv_url: cvPath,
    });

    setSubmitting(false);
    if (error) {
      toast({
        title: "Bir hata oluştu",
        description: "Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Başvurunuz alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    setFormData({ name: "", email: "", phone: "", position: "", message: "" });
    setCvFile(null);
    const cvInput = document.getElementById("intern-cv-upload") as HTMLInputElement | null;
    if (cvInput) cvInput.value = "";
  };

  const inputClass =
    "bg-background/50 border-border/80 h-12 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Staj Programları | Küheylan Hukuk Bürosu"
        description="Küheylan Hukuk Bürosu staj programları: avukatlık stajı, hukuk fakültesi öğrenci stajı ve yaz stajı. Program içeriği, başvuru koşulları ve online staj başvuru formu."
        path="/staj"
      />
      <Navbar />

      <PageHeader eyebrow="Küheylan Hukuk" title={t("intern.title")} />

      {/* Intro */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground leading-relaxed text-justify"
          >
            {t("intern.intro")}
          </motion.p>
        </div>
      </section>

      {/* Programs */}
      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("intern.programs_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map(({ id, Icon }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group h-full bg-card border border-border rounded-lg p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mb-5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg text-foreground font-semibold mb-2">
                  {t(`intern.program${id}.title`)}
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] text-primary mb-3">
                  {t(`intern.program${id}.meta`)}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`intern.program${id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gains */}
      <section className="pb-16 lg:pb-20 bg-muted/40 py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("intern.gains_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gains.map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 bg-card border border-border rounded-lg p-6"
              >
                <span className="shrink-0 font-serif text-xl text-primary/70 font-bold">0{id}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`intern.gain${id}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / how to apply */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("intern.process_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map(({ id, Icon }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-lg p-7"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base text-foreground font-semibold mb-2">
                  {t(`intern.step${id}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`intern.step${id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="staj-basvuru" className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
              {t("intern.form_title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="intern-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.name")}
                  </label>
                  <Input id="intern-name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.name_placeholder")} maxLength={100} required className={inputClass} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="intern-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.email_label")}
                  </label>
                  <Input id="intern-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.email_placeholder")} maxLength={255} required className={inputClass} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="intern-phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.phone_label")}
                  </label>
                  <Input id="intern-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder={t("contact.phone_placeholder")} maxLength={20} className={inputClass} />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="intern-position" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("intern.program_label")}
                  </label>
                  <select
                    id="intern-position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full h-12 rounded-md bg-background/50 border border-border/80 px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  >
                    <option value="">{t("intern.program_select")}</option>
                    <option value={t("intern.program1.title")}>{t("intern.program1.title")}</option>
                    <option value={t("intern.program2.title")}>{t("intern.program2.title")}</option>
                    <option value={t("intern.program3.title")}>{t("intern.program3.title")}</option>
                  </select>
                  {errors.position && <p className="text-destructive text-xs mt-1">{errors.position}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="intern-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("intern.motivation_label")}
                </label>
                <Textarea id="intern-message" name="message" value={formData.message} onChange={handleChange} placeholder={t("intern.motivation_placeholder")} rows={6} maxLength={2000} required className="bg-background/50 border-border/80 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none" />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="intern-cv-upload" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("career.cv_label")}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    id="intern-cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border file:border-border file:bg-secondary file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-foreground hover:file:bg-secondary/70 cursor-pointer"
                  />
                  {cvFile && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Paperclip className="w-3.5 h-3.5" aria-hidden="true" />
                      {cvFile.name}
                    </span>
                  )}
                </div>
                {errors.cv && <p className="text-destructive text-xs mt-1">{errors.cv}</p>}
              </div>

              <Button type="submit" disabled={submitting} className="w-full gap-2 h-12 uppercase text-sm tracking-[0.15em]">
                <Send className="w-4 h-4" aria-hidden="true" />
                {submitting ? t("career.submitting") : t("intern.submit")}
              </Button>
            </form>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/kariyer"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all"
            >
              {t("intern.see_careers")}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternshipPage;
