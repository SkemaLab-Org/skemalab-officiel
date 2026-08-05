/**
 * Rate limit en mémoire (par instance).
 * Pour multi-instances / serverless en prod : Upstash Redis.
 */

const hits = new Map();

function pruneExpired(now) {
  for (const [key, bucket] of hits) {
    if (now > bucket.resetAt) hits.delete(key);
  }
}

export function checkRateLimit(
  key,
  { limit = 5, windowMs = 15 * 60 * 1000 } = {},
) {
  const now = Date.now();
  if (hits.size > 500) pruneExpired(now);

  let bucket = hits.get(key);

  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    hits.set(key, bucket);
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { ok: true, remaining: limit - bucket.count };
}
