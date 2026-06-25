/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service_STATUSES, DEFAULT_REQUEST_STATUS } from '../constants';

// Admin/system-owned fields a client must never set when creating a request.
// (createdBy is also overwritten in the service, but stripped here as defense-in-depth.)
const FORBIDDEN_CREATE_FIELDS = ['internalNote', 'qId', 'createdBy'] as const;

// The only statuses a client may choose on create; anything else is coerced to the
// default so a user can't self-advance a request into the admin workflow
// (in_review / send / closed) or mint a qId via a non-draft status.
const ALLOWED_CREATE_STATUSES: string[] = [
  Service_STATUSES.DRAFT,
  DEFAULT_REQUEST_STATUS, // 'pending'
];

// Strip forbidden fields and clamp `status` on a service-create payload.
// Returns a shallow copy; does not mutate the input.
export const sanitizeServiceCreatePayload = <T extends Record<string, any>>(
  payload: T,
): T => {
  const clean: Record<string, any> = { ...payload };

  for (const field of FORBIDDEN_CREATE_FIELDS) {
    delete clean[field];
  }

  if (
    clean.status !== undefined &&
    !ALLOWED_CREATE_STATUSES.includes(clean.status)
  ) {
    clean.status = DEFAULT_REQUEST_STATUS;
  }

  return clean as T;
};
