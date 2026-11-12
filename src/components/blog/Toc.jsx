"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Toc({ items, title }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  const renderItems = () => (
    <ol>
      {items.map((item) => (
        <li key={item.id} data-depth={item.depth}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className="blog-toc">
      {/* Desktop: sticky rail, always open. Mobile: collapsible disclosure. */}
      <nav className="blog-toc-desktop" aria-label={title}>
        <p className="label-mono blog-toc-label">{title}</p>
        {renderItems()}
      </nav>

      <details className="blog-toc-mobile">
        <summary className="label-mono blog-toc-label">
          {title}
          <ChevronDown
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="blog-toc-chevron"
          />
        </summary>
        {renderItems()}
      </details>
    </aside>
  );
}
