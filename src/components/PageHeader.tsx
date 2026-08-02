import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
}

/**
 * Editorial page header: no fading gradient — a calm light band with a fine
 * rule, a small eyebrow label and an accent line under the serif title.
 */
const PageHeader = ({ title, eyebrow, description }: PageHeaderProps) => {
  return (
    <header className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-background border-b border-border overflow-hidden">
      {/* slowly drifting editorial grid rules */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] page-header-lines"
      />
      {/* soft breathing accent haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] w-[560px] h-[560px] rounded-full page-header-glow"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.10) 0%, transparent 65%)",
        }}
      />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-primary mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] leading-tight text-foreground">
            {title}
          </h1>
          <div className="w-14 h-[3px] bg-primary mt-6 page-header-rule" />
          {description && (
            <p className="text-muted-foreground mt-6 max-w-2xl text-justify">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default PageHeader;
