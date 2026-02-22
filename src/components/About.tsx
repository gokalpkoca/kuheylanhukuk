import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hakkimizda" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Hakkımızda
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
            Bilgi, Tecrübe, Deneyimli Kadro
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-center">
            Büromuzun önceliği, müvekkillerinin karşılaşabileceği hukuki riskleri henüz ortaya
            çıkmadan önlemek, müvekkillerine en uygun ve en doğru çözümleri sunmaktır.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-center">
            İngilizce, Almanca, İspanyolca, Fransızca ve Rusça, Arapça dillerinde hizmet veren
            deneyimli ortakları, danışmanları ve avukatları ile müvekkillerine en üst düzeyde hukuki
            destek sağlamaktadır.
          </p>
          <div className="text-center pt-4">
            <a
              href="#"
              className="inline-block px-8 py-3 border border-gold text-gold uppercase text-sm tracking-[0.15em] font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            >
              Daha Fazla Oku
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
