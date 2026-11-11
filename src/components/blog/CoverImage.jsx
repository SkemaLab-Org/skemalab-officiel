"use client";

import Image from "next/image";
import { useState } from "react";

export default function CoverImage({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 1024px, 100vw",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="cover-box">
      {failed ? (
        <div className="cover-fallback" role="img" aria-label={alt} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
}
