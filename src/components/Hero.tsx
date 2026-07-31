import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logoK from "@/assets/logo-k.png";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center justify-center bg-secondary px-3 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-10 lg:min-h-screen lg:px-8 lg:pt-28 lg:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-7xl bg-background shadow-[0_40px_80px_-15px_hsl(var(--foreground)/0.14)] flex flex-col lg:flex-row overflow-hidden lg:min-h-[720px]"

      >
        {/* Decorative logo mark */}
        <img
          src={logoK}
          alt=""
          aria-hidden="true"
          width={410}
          height={460}
          className="pointer-events-none select-none absolute -bottom-8 -left-4 h-[16rem] lg:h-[22rem] w-auto opacity-[0.035] z-0"
        />



        {/* Content side */}
        <div className="lg:w-[66%] px-6 py-10 sm:px-10 sm:py-14 lg:p-20 flex flex-col justify-center relative z-20">
          <div className="mb-6 lg:mb-8 flex items-center">
            <p className="text-foreground uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[9px] sm:text-[10px] font-medium">
              {t("hero.subtitle")}
            </p>
          </div>

          <h1 className="font-serif text-foreground text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.05] lg:leading-[1] tracking-tight mb-6 lg:mb-8">
            {t("hero.title1")}
            <br />
            <span className="italic text-primary">{t("hero.title2")}</span>
            {t("hero.title3") && t("hero.title3") !== "hero.title3" ? ` ${t("hero.title3")}` : ""}
          </h1>

          <p className="max-w-md text-foreground/75 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-8 lg:mb-12">
            {t("hero.description")}
          </p>


          <div>
            <a
              href="#hakkimizda"
              className="group relative inline-flex items-center px-8 py-3.5 sm:px-10 sm:py-4 lg:px-12 lg:py-5 border border-foreground overflow-hidden transition-colors duration-500 hover:border-primary"
            >
              <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative text-foreground text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-primary-foreground">
                {t("hero.cta")}
              </span>
              <svg
                className="relative ml-4 w-5 h-5 text-foreground transition-all duration-500 group-hover:text-primary-foreground group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Imagery side */}
        <div className="lg:w-[34%] relative h-[220px] sm:h-[320px] lg:h-auto lg:min-h-full overflow-hidden group border-t lg:border-t-0 lg:border-l border-foreground/10">
          <img
            src={heroBg}
            alt=""
            width={1280}
            height={1920}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] lg:object-center transition-transform duration-[1200ms] group-hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary z-30" />
        </div>

      </motion.div>
    </section>
  );
};

export default Hero;
