import CopyLinkButton from "./CopyLinkButton";

export default function ShareButtons({
  url,
  title,
  label,
  copyLabel,
  copiedLabel,
}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  return (
    <div className="blog-share">
      <span className="blog-share-label">{label}</span>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="blog-share-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — ${link.label}`}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <CopyLinkButton
            url={url}
            label={copyLabel}
            copiedLabel={copiedLabel}
          />
        </li>
      </ul>
    </div>
  );
}
