import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  MapPin,
  Send,
  ChevronDown,
  GraduationCap,
  Users,
  Paperclip,
  Scale,
  BookOpen,
  CalendarDays,
  FileCheck2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { careerApplicationSchema } from "@/lib/careerValidation";
import { supabase } from "@/integrations/supabase/client";

const CAREER_EMAIL = "kariyer@kuheylanhukuk.com";

const ALLOWED_CV_EXT = ["pdf", "doc", "docx"];
const MAX_CV_SIZE = 5 * 1024 * 1024;

const CareersPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [careerForm, setCareerForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [careerCvFile, setCareerCvFile] = useState<File | null>(null);
  const [careerErrors, setCareerErrors] = useState<Record<string, string>>({});
  const [careerSubmitting, setCareerSubmitting] = useState(false);
  const [expandedPosition, setExpandedPosition] = useState<string | null>(null);

  const [internForm, setInternForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [internCvFile, setInternCvFile] = useState<File | null>(null);
  const [internErrors, setInternErrors] = useState<Record<string, string>>({});
  const [internSubmitting, setInternSubmitting] = useState(false);

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

  const programs = [
    { id: "1", Icon: Scale, title: t("intern.program1.title"), meta: t("intern.program1.meta"), desc: t("intern.program1.desc") },
    { id: "2", Icon: BookOpen, title: t("intern.program2.title"), meta: t("intern.program2.meta"), desc: t("intern.program2.desc") },
    { id: "3", Icon: GraduationCap, title: t("intern.program3.title"), meta: t("intern.program3.meta"), desc: t("intern.program3.desc") },
  ];

  const gains = ["1", "2", "3", "4"];
  const timeline = [
    { id: "1", Icon: CalendarDays, title: t("intern.step1.title"), desc: t("intern.step1.desc") },
    { id: "2", Icon: FileCheck2, title: t("intern.step2.title"), desc: t("intern.step2.desc") },
    { id: "3", Icon: Users, title: t("intern.step3.title"), desc: t("intern.step3.desc") },
  ];

  const handleCareerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setCareerCvFile(null);
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_CV_EXT.includes(ext)) {
      setCareerCvFile(null);
      setCareerErrors((prev) => ({ ...prev, cv: t("career.cv_error_type") }));
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setCareerCvFile(null);
      setCareerErrors((prev) => ({ ...prev, cv: t("career.cv_error_size") }));
      return;
    }
    setCareerErrors((prev) => ({ ...prev, cv: "" }));
    setCareerCvFile(file);
  };

  const handleInternFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setInternCvFile(null);
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_CV_EXT.includes(ext)) {
      setInternCvFile(null);
      setInternErrors((prev) => ({ ...prev, cv: t("career.cv_error_type") }));
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setInternCvFile(null);
      setInternErrors((prev) => ({ ...prev, cv: t("career.cv_error_size") }));
      return;
    }
    setInternErrors((prev) => ({ ...prev, cv: "" }));
    setInternCvFile(file);
  };

  const uploadCv = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
    const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("career-cvs")
      .upload(safeName, file, { contentType: file.type || undefined });
    if (uploadError) throw new Error("upload failed");
    return safeName;
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = careerApplicationSchema.safeParse(careerForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setCareerErrors(fieldErrors);
      return;
    }
    setCareerErrors({});
    setCareerSubmitting(true);
    const validated = result.data;

    let cvPath: string | null = null;
    try {
      cvPath = await uploadCv(careerCvFile);
    } catch {
      setCareerSubmitting(false);
      toast({
        title: "Dosya yüklenemedi",
        description: "CV dosyanız yüklenemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("career_applications").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || null,
      position: validated.position || t("career.general_application"),
      message: validated.message,
      cv_url: cvPath,
    });

    setCareerSubmitting(false);
    if (error) {
      toast({
        title: "Bir hata oluştu",
        description: "Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Başvurunuz alındı", description: "En kısa sürede sizinle iletişime geçeceğiz." });
    setCareerForm({ name: "", email: "", phone: "", position: "", message: "" });
    setCareerCvFile(null);
    const cvInput = document.getElementById("career-cv-upload") as HTMLInputElement | null;
    if (cvInput) cvInput.value = "";
  };

  const handleInternSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = careerApplicationSchema.safeParse(internForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setInternErrors(fieldErrors);
      return;
    }
    setInternErrors({});
    setInternSubmitting(true);
    const validated = result.data;

    let cvPath: string | null = null;
    try {
      cvPath = await uploadCv(internCvFile);
    } catch {
      setInternSubmitting(false);
      toast({
        title: "Dosya yüklenemedi",
        description: "CV dosyanız yüklenemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("career_applications").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || null,
      position: `Staj — ${validated.position || t("intern.form_default_position")}`,
      message: validated.message,
      cv_url: cvPath,
    });

    setInternSubmitting(false);
    if (error) {
      toast({
        title: "Bir hata oluştu",
        description: "Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Başvurunuz alındı", description: "En kısa sürede sizinle iletişime geçeceğiz." });
    setInternForm({ name: "", email: "", phone: "", position: "", message: "" });
    setInternCvFile(null);
    const cvInput = document.getElementById("intern-cv-upload") as HTMLInputElement | null;
    if (cvInput) cvInput.value = "";
  };

  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCareerForm((prev) => ({ ...prev, [name]: value }));
    if (careerErrors[name]) setCareerErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInternChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInternForm((prev) => ({ ...prev, [name]: value }));
    if (internErrors[name]) setInternErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClass =
    "bg-background/50 border-border/80 h-12 text-sm font-['Roboto'] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Kariyer | Küheylan Hukuk Bürosu"
        description="Küheylan Hukuk Bürosu'nda avukat, stajyer avukat, destek ekibi ve staj programları kariyer fırsatları. Başvuru formunu doldurup CV'nizi yükleyerek ekibimize katılın."
        path="/kariyer"
      />
      <Navbar />

      <PageHeader eyebrow="Küheylan Hukuk" title={t("career.title")} />

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
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pos.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {pos.location}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      expandedPosition === pos.id ? "rotate-180" : ""
                    }`}
                  />
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
                        setCareerForm((prev) => ({ ...prev, position: pos.title }));
                        document.getElementById("career-application-form")?.scrollIntoView({ behavior: "smooth" });
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

      {/* Career Application Form */}
      <section id="career-application-form" className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
                {t("career.form_title")}
              </h2>

              <form onSubmit={handleCareerSubmit} className="space-y-6 font-['Roboto']">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.name")}
                    </label>
                    <Input
                      name="name"
                      value={careerForm.name}
                      onChange={handleCareerChange}
                      placeholder={t("contact.name_placeholder")}
                      maxLength={100}
                      required
                      className={inputClass}
                    />
                    {careerErrors.name && <p className="text-destructive text-xs mt-1">{careerErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.email_label")}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={careerForm.email}
                      onChange={handleCareerChange}
                      placeholder={t("contact.email_placeholder")}
                      maxLength={255}
                      required
                      className={inputClass}
                    />
                    {careerErrors.email && <p className="text-destructive text-xs mt-1">{careerErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.phone_label")}
                    </label>
                    <Input
                      name="phone"
                      value={careerForm.phone}
                      onChange={handleCareerChange}
                      placeholder={t("contact.phone_placeholder")}
                      maxLength={20}
                      className={inputClass}
                    />
                    {careerErrors.phone && <p className="text-destructive text-xs mt-1">{careerErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("career.position_label")}
                    </label>
                    <select
                      name="position"
                      value={careerForm.position}
                      onChange={handleCareerChange}
                      className="w-full h-12 rounded-md bg-background/50 border border-border/80 px-3 text-sm font-['Roboto'] text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    >
                      <option value="">{t("career.general_application")}</option>
                      {positions.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    {careerErrors.position && <p className="text-destructive text-xs mt-1">{careerErrors.position}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("career.cover_letter")}
                  </label>
                  <Textarea
                    name="message"
                    value={careerForm.message}
                    onChange={handleCareerChange}
                    placeholder={t("career.cover_letter_placeholder")}
                    rows={6}
                    maxLength={2000}
                    required
                    className="bg-background/50 border-border/80 text-sm font-['Roboto'] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                  />
                  {careerErrors.message && <p className="text-destructive text-xs mt-1">{careerErrors.message}</p>}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="career-cv-upload"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t("career.cv_label")}
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      id="career-cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleCareerFileChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="career-cv-upload"
                      className="inline-flex items-center gap-2 h-12 px-5 rounded-md border border-border/80 bg-background/50 text-sm font-['Roboto'] text-foreground cursor-pointer hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      {t("career.cv_button")}
                    </label>
                    <span className="text-xs font-['Roboto'] text-muted-foreground">
                      {careerCvFile ? careerCvFile.name : t("career.cv_hint")}
                    </span>
                  </div>
                  {careerErrors.cv && <p className="text-destructive text-xs mt-1">{careerErrors.cv}</p>}
                </div>

                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={careerSubmitting}
                    className="gap-3 px-10 h-12 text-sm font-semibold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    {careerSubmitting ? t("career.submitting") : t("career.send_application")}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internship Intro */}
      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground leading-relaxed text-justify"
          >
            {t("intern.intro")}
          </motion.p>
        </div>
      </section>

      {/* Internship Programs */}
      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("intern.programs_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map(({ id, Icon, title, meta, desc }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group h-full bg-card border border-border rounded-lg p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mb-5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg text-foreground font-semibold mb-2">{title}</h3>
                <p className="text-xs uppercase tracking-[0.15em] text-primary mb-3">{meta}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setInternForm((prev) => ({ ...prev, position: title }));
                    document.getElementById("internship-application-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="gap-2 text-xs uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t("career.apply_now")}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Gains */}
      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("intern.gains_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gains.map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 bg-card border border-border rounded-lg p-6"
              >
                <span className="shrink-0 font-serif text-xl text-primary/70 font-bold">0{id}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`intern.gain${id}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Process */}
      <section className="pb-16 lg:pb-20 bg-muted/40 py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
            {t("intern.process_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map(({ id, Icon, title, desc }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-lg p-7"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base text-foreground font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Application Form */}
      <section id="internship-application-form" className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10">
                {t("intern.form_title")}
              </h2>

              <form onSubmit={handleInternSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.name")}
                    </label>
                    <Input
                      name="name"
                      value={internForm.name}
                      onChange={handleInternChange}
                      placeholder={t("contact.name_placeholder")}
                      maxLength={100}
                      required
                      className={inputClass}
                    />
                    {internErrors.name && <p className="text-destructive text-xs mt-1">{internErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.email_label")}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={internForm.email}
                      onChange={handleInternChange}
                      placeholder={t("contact.email_placeholder")}
                      maxLength={255}
                      required
                      className={inputClass}
                    />
                    {internErrors.email && <p className="text-destructive text-xs mt-1">{internErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.phone_label")}
                    </label>
                    <Input
                      name="phone"
                      value={internForm.phone}
                      onChange={handleInternChange}
                      placeholder={t("contact.phone_placeholder")}
                      maxLength={20}
                      className={inputClass}
                    />
                    {internErrors.phone && <p className="text-destructive text-xs mt-1">{internErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("intern.program_label")}
                    </label>
                    <select
                      name="position"
                      value={internForm.position}
                      onChange={handleInternChange}
                      className="w-full h-12 rounded-md bg-background/50 border border-border/80 px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    >
                      <option value="">{t("intern.program_select")}</option>
                      {programs.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    {internErrors.position && <p className="text-destructive text-xs mt-1">{internErrors.position}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("intern.motivation_label")}
                  </label>
                  <Textarea
                    name="message"
                    value={internForm.message}
                    onChange={handleInternChange}
                    placeholder={t("intern.motivation_placeholder")}
                    rows={6}
                    maxLength={2000}
                    required
                    className="bg-background/50 border-border/80 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                  />
                  {internErrors.message && <p className="text-destructive text-xs mt-1">{internErrors.message}</p>}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="intern-cv-upload"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t("career.cv_label")}
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      id="intern-cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleInternFileChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="intern-cv-upload"
                      className="inline-flex items-center gap-2 h-12 px-5 rounded-md border border-border/80 bg-background/50 text-sm text-foreground cursor-pointer hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      {t("career.cv_button")}
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {internCvFile ? internCvFile.name : t("career.cv_hint")}
                    </span>
                  </div>
                  {internErrors.cv && <p className="text-destructive text-xs mt-1">{internErrors.cv}</p>}
                </div>

                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={internSubmitting}
                    className="gap-3 px-10 h-12 text-sm font-semibold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    {internSubmitting ? t("career.submitting") : t("intern.submit")}
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
