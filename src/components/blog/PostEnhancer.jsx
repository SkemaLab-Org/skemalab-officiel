"use client";

import { useEffect } from "react";

/**
 * Adds a copy button to every code block. The Markdown pipeline runs on the
 * server, so this is purely progressive enhancement.
 */
export default function PostEnhancer({ copyLabel, copiedLabel }) {
  useEffect(() => {
    const blocks = document.querySelectorAll(".prose-skema pre");
    const cleanups = [];

    blocks.forEach((pre) => {
      const host =
        pre.closest("figure[data-rehype-pretty-code-figure]") ||
        pre.parentElement;
      if (!host || host.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-btn";
      button.textContent = copyLabel;

      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          button.textContent = copiedLabel;
          window.setTimeout(() => {
            button.textContent = copyLabel;
          }, 1500);
        } catch {
          /* Clipboard can be unavailable (permissions, insecure context). */
        }
      };

      button.addEventListener("click", onClick);
      host.classList.add("has-copy");
      host.appendChild(button);

      cleanups.push(() => {
        button.removeEventListener("click", onClick);
        button.remove();
        host.classList.remove("has-copy");
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [copyLabel, copiedLabel]);

  return null;
}
