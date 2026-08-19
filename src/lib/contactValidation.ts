import { z } from "zod";

type Lang = "tr" | "en" | "ar" | "ru";

type Copy = {
  required: (f: string) => string;
  min: (f: string, n: number) => string;
  max: (f: string, n: number) => string;
  chars: (f: string) => string;
  email: string;
  emailNoAt: string;
  phone: string;
  phoneShort: string;
  urlNotAllowed: string;
  fields: Record<"name" | "email" | "phone" | "subject" | "message", string>;
  summary: (n: number) => string;
  remaining: (n: number) => string;
};

const COPY: Record<Lang, Copy> = {
  tr: {
    required: (f) => `${f} alanı zorunludur.`,
    min: (f, n) => `${f} en az ${n} karakter olmalıdır.`,
    max: (f, n) => `${f} en fazla ${n} karakter olabilir.`,
    chars: (f) => `${f} alanında geçersiz karakterler var.`,
    email: "Geçerli bir e-posta adresi girin (örn. ad@ornek.com).",
    emailNoAt: "E-posta adresi “@” işareti içermelidir.",
    phone: "Telefon numarası yalnızca rakam, boşluk ve + ( ) - içerebilir.",
    phoneShort: "Telefon numarası en az 10 haneli olmalıdır.",
    urlNotAllowed: "Mesaj içinde bağlantı (link) paylaşılamaz.",
    fields: { name: "Ad Soyad", email: "E-posta", phone: "Telefon", subject: "Konu", message: "Mesaj" },
    summary: (n) => `${n} alanı kontrol edin.`,
    remaining: (n) => `${n} karakter kaldı`,
  },
  en: {
    required: (f) => `${f} is required.`,
    min: (f, n) => `${f} must be at least ${n} characters.`,
    max: (f, n) => `${f} must be at most ${n} characters.`,
    chars: (f) => `${f} contains invalid characters.`,
    email: "Enter a valid email address (e.g. name@example.com).",
    emailNoAt: "The email address must contain an “@” sign.",
    phone: "Phone may only contain digits, spaces and + ( ) -.",
    phoneShort: "Phone number must have at least 10 digits.",
    urlNotAllowed: "Links are not allowed in the message.",
    fields: { name: "Full name", email: "Email", phone: "Phone", subject: "Subject", message: "Message" },
    summary: (n) => `Please review ${n} field(s).`,
    remaining: (n) => `${n} characters left`,
  },
  ar: {
    required: (f) => `حقل ${f} مطلوب.`,
    min: (f, n) => `يجب أن يكون ${f} ${n} أحرف على الأقل.`,
    max: (f, n) => `يجب ألا يزيد ${f} عن ${n} حرفًا.`,
    chars: (f) => `يحتوي ${f} على أحرف غير صالحة.`,
    email: "أدخل بريدًا إلكترونيًا صالحًا (مثال: name@example.com).",
    emailNoAt: "يجب أن يحتوي البريد الإلكتروني على علامة «@».",
    phone: "يمكن أن يحتوي الهاتف على أرقام ومسافات و + ( ) - فقط.",
    phoneShort: "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل.",
    urlNotAllowed: "لا يُسمح بمشاركة الروابط في الرسالة.",
    fields: { name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف", subject: "الموضوع", message: "الرسالة" },
    summary: (n) => `يرجى مراجعة ${n} حقل.`,
    remaining: (n) => `بقي ${n} حرفًا`,
  },
  ru: {
    required: (f) => `Поле «${f}» обязательно.`,
    min: (f, n) => `«${f}» должно содержать минимум ${n} символов.`,
    max: (f, n) => `«${f}» должно содержать не более ${n} символов.`,
    chars: (f) => `«${f}» содержит недопустимые символы.`,
    email: "Введите корректный e-mail (например, name@example.com).",
    emailNoAt: "Адрес электронной почты должен содержать символ «@».",
    phone: "Телефон может содержать только цифры, пробелы и + ( ) -.",
    phoneShort: "Номер телефона должен содержать минимум 10 цифр.",
    urlNotAllowed: "Ссылки в сообщении не допускаются.",
    fields: { name: "Имя и фамилия", email: "E-mail", phone: "Телефон", subject: "Тема", message: "Сообщение" },
    summary: (n) => `Проверьте поля: ${n}.`,
    remaining: (n) => `осталось символов: ${n}`,
  },
};

export const getContactCopy = (lang: string): Copy => COPY[(lang as Lang)] ?? COPY.tr;

const NAME_RE = /^[a-zA-ZğüşöçıİĞÜŞÖÇÀ-ÿА-яёЁء-ي\s\-'.]+$/;
const PHONE_RE = /^[+\d\s\-()]*$/;
const URL_RE = /(https?:\/\/|www\.|\.(com|net|org|ru|info|xyz)\b)/i;

export const getContactSchema = (lang: string) => {
  const c = getContactCopy(lang);
  const f = c.fields;

  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: c.required(f.name) })
      .min(2, { message: c.min(f.name, 2) })
      .max(100, { message: c.max(f.name, 100) })
      .regex(NAME_RE, { message: c.chars(f.name) }),
    email: z
      .string()
      .trim()
      .min(1, { message: c.required(f.email) })
      .max(255, { message: c.max(f.email, 255) })
      .refine((v) => v.includes("@"), { message: c.emailNoAt })
      .refine((v) => z.string().email().safeParse(v).success, { message: c.email }),
    phone: z
      .string()
      .trim()
      .max(20, { message: c.max(f.phone, 20) })
      .regex(PHONE_RE, { message: c.phone })
      .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, { message: c.phoneShort })
      .optional()
      .or(z.literal("")),
    subject: z
      .string()
      .trim()
      .min(1, { message: c.required(f.subject) })
      .min(3, { message: c.min(f.subject, 3) })
      .max(200, { message: c.max(f.subject, 200) }),
    message: z
      .string()
      .trim()
      .min(1, { message: c.required(f.message) })
      .min(20, { message: c.min(f.message, 20) })
      .max(2000, { message: c.max(f.message, 2000) })
      .refine((v) => !URL_RE.test(v), { message: c.urlNotAllowed }),
  });
};

/** Backwards-compatible default (Turkish) schema. */
export const contactSchema = getContactSchema("tr");

export type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;

/** Validates a single field so errors can be shown on blur. */
export const validateContactField = (
  lang: string,
  field: keyof ContactFormData,
  value: string,
): string => {
  const shape = getContactSchema(lang).shape[field];
  const res = shape.safeParse(value);
  return res.success ? "" : res.error.errors[0]?.message ?? "";
};
