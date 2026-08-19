import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen } from "lucide-react";

const books = [
{ title: "Sermaye Piyasası Hukuku Uygulamaları", role: "Sermaye Piyasası Departmanı" },
{ title: "Ticaret Hukuku Temel Esasları", role: "Şirketler Hukuku Departmanı" },
{ title: "Türk Ceza Hukukunda Güncel Gelişmeler", role: "Ceza Hukuku Departmanı" },
{ title: "Uluslararası Tahkim ve Arabuluculuk", role: "Uyuşmazlık Çözümü Departmanı" },
{ title: "Fikri Mülkiyet Hakkının Korunması", role: "Fikri Mülkiyet Departmanı" },
{ title: "İş Hukuku Perspektifinden İşçi Hakları", role: "İş Hukuku Departmanı" }];


const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        














        {/* Horizontal Scroll */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {books.map((book, i) =>
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="w-56 shrink-0 border border-border rounded-xl bg-card hover:border-gold transition-all duration-300 group cursor-pointer">

                {/* Book Cover */}
                <div className="aspect-[3/4] bg-navy-light flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
                  <BookOpen className="w-10 h-10 text-gold/60 mb-4 relative z-10" />
                  <p className="font-serif text-sm text-foreground text-center leading-snug relative z-10 font-medium">
                    {book.title}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{book.role}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default Publications;