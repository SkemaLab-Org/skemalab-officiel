"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export default function CopyLinkButton({ url, label, copiedLabel }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const Icon = copied ? Check : Link2;

  return (
    <button
      type="button"
      className="blog-share-link"
      onClick={copy}
      aria-live="polite"
    >
      <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
      {copied ? copiedLabel : label}
    </button>
  );
}
