import { NextFunction, Request, Response } from 'express';

// Strip keys that MongoDB would interpret as query operators ($-prefixed) or as
// dotted paths, recursively, mutating objects IN PLACE.
//
// Why in-house instead of express-mongo-sanitize: that package reassigns
// `req.query`, which is a getter-only property in Express 5 and throws at runtime.
// We only delete offending keys (never reassign the container), so it is Express-5
// safe. Controllers that read list filters from `req.query` also coerce values with
// a string check as defense-in-depth.
const isForbiddenKey = (key: string): boolean =>
  key.startsWith('$') || key.includes('.');

const scrub = (value: unknown): void => {
  if (!value || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    value.forEach(scrub);
    return;
  }

  for (const key of Object.keys(value as Record<string, unknown>)) {
    if (isForbiddenKey(key)) {
      delete (value as Record<string, unknown>)[key];
    } else {
      scrub((value as Record<string, unknown>)[key]);
    }
  }
};

export const sanitizeMongo = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  scrub(req.body);
  scrub(req.params);
  // req.query can't be reassigned in Express 5, but its keys can be mutated.
  try {
    scrub(req.query);
  } catch {
    // ignore if the query object is non-configurable in this runtime
  }
  next();
};
