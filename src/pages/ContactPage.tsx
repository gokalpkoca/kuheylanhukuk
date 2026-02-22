import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
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

  const contactCards = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telefon",
      detail: "+90 535 227 96 96",
      href: "tel:+905352279696",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Mail",
      detail: "info@kuheylanhukuk.com",
      href: "mailto:info@kuheylanhukuk.com",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Adres",
      detail: "Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul, Türkiye",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[280px] md:h-[340px] flex items-center justify-center bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-card/95 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-bold">
            İletişim
          </h1>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>
      </section>

      {/* Contact Cards */}
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

      {/* Map Section */}
      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-8">
              İletişim Haritası
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

      {/* Contact Form */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-card border border-border rounded-lg p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-2">
                Bize Ulaşın
              </h2>
              <p className="text-muted-foreground text-center text-sm mb-8">
                Formu doldurarak bizimle iletişime geçebilirsiniz.
              </p>
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
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mesajınızı buraya yazınız..." rows={6} required className="bg-background border-border" />
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg" className="gap-2 px-10">
                    <Send className="w-4 h-4" />
                    Gönder
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
