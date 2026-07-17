"use client";

import { Trash2 } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

export function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm(confirmMessage)) event.preventDefault();
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400"
      >
        <Icon icon={Trash2} size="sm" />
        {label ?? "Delete"}
      </button>
    </form>
  );
}
