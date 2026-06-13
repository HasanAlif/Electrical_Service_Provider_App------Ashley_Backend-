export const Service_STATUSES = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  IN_REVIEW: 'in_review',
  QUOTED: 'quoted',
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type TServiceStatus =
  (typeof Service_STATUSES)[keyof typeof Service_STATUSES];

export const DEFAULT_REQUEST_STATUS = Service_STATUSES.SUBMITTED;
