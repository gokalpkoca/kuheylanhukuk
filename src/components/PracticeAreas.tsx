import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Scale, Gavel, Heart, Newspaper, TreePine, Landmark, Building2,
  TrendingUp, Package, Award, Trophy, Users, Briefcase, FileText, HardHat
} from "lucide-react";

const areas = [
  { icon: Users, label: "STK Hukuku" },
  { icon: Gavel, label: "Ceza Hukuku" },
  { icon: Heart, label: "Sağlık Hukuku" },
  { icon: Newspaper, label: "Basın Hukuku" },
  { icon: TreePine, label: "Çevre Hukuku" },
  { icon: Landmark, label: "Banka Hukuku" },
  { icon: Building2, label: "Kültür ve Tabiat Varlıkları Hukuku" },
  { icon: TrendingUp, label: "Sermaye Piyasası Hukuku" },
  { icon: Package, label: "Gümrük Hukuku" },
  { icon: Award, label: "Marka & Patent Hukuku" },
  { icon: Trophy, label: "Spor Hukuku" },
  { icon: Scale, label: "Medeni Hukuk" },
  { icon: Briefcase, label: "Şirketler Hukuku" },
  { icon: FileText, label: "İcra & İflas Hukuku" },
  { icon: HardHat, label: "İş Hukuku" },
];

const PracticeAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faaliyet-alanlari" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Uzmanlık Alanlarımız
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            Faaliyet Alanları
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {areas.map((area, i) => (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group cursor-pointer border border-border rounded bg-card p-6 text-center hover:border-gold hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
            >
              <area.icon className="w-8 h-8 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-serif text-sm lg:text-base text-foreground font-medium">
                {area.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
