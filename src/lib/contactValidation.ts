import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-ZğüşöçıİĞÜŞÖÇÀ-ÿА-яёЁ\s\-'.]+$/, {
      message: "Name contains invalid characters",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "Phone must be less than 20 characters" })
    .regex(/^[+\d\s\-()]*$/, { message: "Phone contains invalid characters" })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(2, { message: "Subject must be at least 2 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
