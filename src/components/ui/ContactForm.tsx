"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import {
  contactSchema,
  projectTypes,
  type ContactFormValues,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "brand-identity",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="bg-surface flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
        >
          <Icon icon={CheckCircle2} size="lg" className="text-accent" />
        </motion.div>
        <h3 className="text-foreground text-lg font-semibold">Message sent</h3>
        <p className="text-muted max-w-[40ch] text-sm">
          Thanks — I&rsquo;ll get back to you within a day or two. For anything
          urgent, WhatsApp is fastest.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Name" error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={inputClass(Boolean(errors.name))}
          placeholder="Your name"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={inputClass(Boolean(errors.email))}
          placeholder="you@email.com"
        />
      </Field>

      <Field label="What do you need?">
        <select
          value={values.projectType}
          onChange={(event) =>
            updateField(
              "projectType",
              event.target.value as ContactFormValues["projectType"],
            )
          }
          className={inputClass(false)}
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          className={cn(inputClass(Boolean(errors.message)), "resize-none")}
          placeholder="Tell me a bit about the project..."
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong sending that — try WhatsApp or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          buttonVariants({ variant: "accent", size: "lg" }),
          "w-fit",
        )}
      >
        {status === "submitting" ? (
          <>
            <Icon icon={Loader2} size="sm" className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send Message
            <Icon icon={Send} size="sm" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "rounded-[var(--radius-xs)] border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent",
    hasError ? "border-red-400" : "border-border",
  );
}
