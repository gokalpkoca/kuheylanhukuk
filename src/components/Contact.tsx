import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@kuheylanhukuk.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Ad Soyad: ${formData.name}\nE-posta: ${formData.email}\nTelefon: ${formData.phone}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    toast({ title: "Yönlendiriliyor", description: "E-posta uygulamanız açılıyor..." });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            Bize Ulaşın
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            İletişim Bilgileri
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
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
                <h3 className="font-serif text-lg text-foreground font-semibold mb-1">Telefon</h3>
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
                <h3 className="font-serif text-lg text-foreground font-semibold mb-1">E-posta</h3>
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
                <h3 className="font-serif text-lg text-foreground font-semibold mb-1">Adres</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Burhaniye, Neşet Bey Sk. NO:12<br />
                  Kat:3 D:5, 34676<br />
                  Üsküdar/İstanbul, Türkiye
                </p>
              </div>
            </div>

            {/* Map */}
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="font-serif text-xl text-foreground font-semibold mb-6">İletişim Formu</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Ad Soyad</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Adınız Soyadınız" required className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">E-posta</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ornek@mail.com" required className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Telefon</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+90 5XX XXX XX XX" className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Konu</label>
                    <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Konu başlığı" required className="bg-background border-border" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mesajınız</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mesajınızı buraya yazınız..." rows={5} required className="bg-background border-border" />
                </div>
                <Button type="submit" className="w-full md:w-auto gap-2">
                  <Send className="w-4 h-4" />
                  Gönder
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
