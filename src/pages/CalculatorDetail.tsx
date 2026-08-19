import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCalculator, type CalcResult } from "@/data/calculators";

const CalculatorDetail = () => {
  const { slug } = useParams();
  const calculator = getCalculator(slug);

  const initialValues = useMemo(() => {
    const v: Record<string, string> = {};
    calculator?.fields.forEach((f) => {
      v[f.name] = f.defaultValue ?? (f.type === "select" ? f.options?.[0]?.value ?? "" : "");
    });
    return v;
  }, [calculator]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [results, setResults] = useState<CalcResult[] | null>(null);

  if (!calculator) return <NotFound />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(calculator.compute(values));
  };

  const handleReset = () => {
    setValues(initialValues);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${calculator.title} | Küheylan Hukuk Bürosu`}
        description={calculator.description}
        path={`/hesaplama-araclarimiz/${calculator.slug}`}
      />
      <Navbar />

      <section className="pt-32 pb-6">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link
            to="/hesaplama-araclarimiz"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Hesaplama Araçlarımız
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground font-bold">{calculator.title}</h1>
            <div className="w-14 h-px bg-primary/60 mt-5 mb-6" />
            <p className="text-muted-foreground text-justify mb-10">{calculator.description}</p>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {calculator.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                      {field.label}
                      {field.suffix ? <span className="text-muted-foreground"> ({field.suffix})</span> : null}
                    </label>
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        value={values[field.name] ?? ""}
                        onChange={(e) => setValues((p) => ({ ...p, [field.name]: e.target.value }))}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {field.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type === "date" ? "date" : "number"}
                        step="any"
                        inputMode={field.type === "number" ? "decimal" : undefined}
                        value={values[field.name] ?? ""}
                        onChange={(e) => setValues((p) => ({ ...p, [field.name]: e.target.value }))}
                      />
                    )}
                    {field.hint ? <p className="text-xs text-muted-foreground">{field.hint}</p> : null}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit">Hesapla</Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Temizle
                </Button>
              </div>
            </form>

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-8 bg-muted/40 border border-border rounded-xl p-6 md:p-8"
              >
                <h2 className="font-serif text-xl text-foreground font-semibold mb-5">Hesaplama Sonucu</h2>
                <dl className="divide-y divide-border">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={`flex flex-wrap items-baseline justify-between gap-2 py-3 ${
                        r.emphasis ? "text-primary font-semibold" : ""
                      }`}
                    >
                      <dt className={r.emphasis ? "" : "text-muted-foreground text-sm"}>{r.label}</dt>
                      <dd className={r.emphasis ? "text-lg" : "text-foreground text-sm font-medium"}>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}

            <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
              {calculator.note ? `${calculator.note} ` : ""}
              Bu araç yalnızca bilgilendirme amaçlıdır; hesaplamalar hukuki mütalaa veya bilirkişi raporu niteliği
              taşımaz. Somut olayınıza ilişkin değerlendirme için{" "}
              <Link to="/iletisim" className="text-primary hover:underline">
                bizimle iletişime geçebilirsiniz
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CalculatorDetail;
