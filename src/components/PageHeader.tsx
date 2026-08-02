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
      {/* subtle vertical rules for an editorial grid feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "160px 100%",
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
          <div className="w-14 h-[3px] bg-primary mt-6" />
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
