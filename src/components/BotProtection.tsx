import { useCallback, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

const COPY: Record<string, { label: string; hint: string; wrong: string; tooFast: string }> = {
  tr: {
    label: "Güvenlik doğrulaması",
    hint: "Spam koruması: lütfen aşağıdaki toplamı yazın.",
    wrong: "Doğrulama yanlış, lütfen tekrar deneyin.",
    tooFast: "Form çok hızlı gönderildi, lütfen tekrar deneyin.",
  },
  en: {
    label: "Security check",
    hint: "Spam protection: please enter the sum below.",
    wrong: "Incorrect answer, please try again.",
    tooFast: "Form submitted too fast, please try again.",
  },
  ar: {
    label: "التحقق الأمني",
    hint: "الحماية من البريد المزعج: يرجى إدخال ناتج الجمع.",
    wrong: "إجابة غير صحيحة، يرجى المحاولة مرة أخرى.",
    tooFast: "تم إرسال النموذج بسرعة كبيرة، يرجى المحاولة مرة أخرى.",
  },
  ru: {
    label: "Проверка безопасности",
    hint: "Защита от спама: введите результат сложения.",
    wrong: "Неверный ответ, попробуйте снова.",
    tooFast: "Форма отправлена слишком быстро, попробуйте снова.",
  },
};

const randomPair = () => ({
  a: Math.floor(Math.random() * 8) + 2,
  b: Math.floor(Math.random() * 8) + 2,
});

export const useBotProtection = () => {
  const [pair, setPair] = useState(randomPair);
  const [answer, setAnswer] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const mountedAt = useRef(Date.now());
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.tr;

  const reset = useCallback(() => {
    setPair(randomPair());
    setAnswer("");
    mountedAt.current = Date.now();
  }, []);

  const verify = useCallback(() => {
    // Honeypot: only bots fill hidden fields
    if (honeypot.trim() !== "") {
      setError(copy.wrong);
      reset();
      return false;
    }
    // Timing trap: humans need more than ~2s to fill the form
    if (Date.now() - mountedAt.current < 2500) {
      setError(copy.tooFast);
      reset();
      return false;
    }
    if (parseInt(answer.trim(), 10) !== pair.a + pair.b) {
      setError(copy.wrong);
      reset();
      return false;
    }
    setError("");
    reset();
    return true;
  }, [answer, honeypot, pair, copy, reset]);

  return {
    verify,
    fieldProps: {
      pair,
      answer,
      setAnswer,
      honeypot,
      setHoneypot,
      error,
      clearError: () => setError(""),
      copy,
    },
  };
};

type FieldProps = ReturnType<typeof useBotProtection>["fieldProps"] & { idPrefix: string };

export const BotProtectionField = ({
  pair,
  answer,
  setAnswer,
  honeypot,
  setHoneypot,
  error,
  clearError,
  copy,
  idPrefix,
}: FieldProps) => (
  <div className="space-y-2">
    {/* Honeypot — hidden from humans, visible to bots */}
    <div className="absolute w-px h-px overflow-hidden opacity-0 -z-10" aria-hidden="true">
      <label htmlFor={`${idPrefix}-website`}>Website</label>
      <input
        id={`${idPrefix}-website`}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
    </div>

    <label
      htmlFor={`${idPrefix}-captcha`}
      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
      {copy.label}
    </label>
    <div className="flex items-center gap-3">
      <span
        className="select-none px-4 h-12 flex items-center rounded-md border border-border/80 bg-muted/40 text-sm font-semibold tracking-widest text-foreground"
        aria-hidden="true"
      >
        {pair.a} + {pair.b} =
      </span>
      <Input
        id={`${idPrefix}-captcha`}
        name="captcha"
        inputMode="numeric"
        autoComplete="off"
        required
        maxLength={3}
        aria-label={`${pair.a} + ${pair.b} = ?`}
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value.replace(/[^0-9]/g, ""));
          if (error) clearError();
        }}
        className="bg-background/50 border-border/80 h-12 text-sm w-24 text-center focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
      />
    </div>
    <p className="text-muted-foreground text-xs">{copy.hint}</p>
    {error && <p className="text-destructive text-xs">{error}</p>}
  </div>
);
