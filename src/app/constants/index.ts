export const Service_STATUSES = [
  'draft',
  'submitted',
  'in_review',
  'quoted',
  'scheduled',
  'completed',
  'cancelled',
] as const;
export type TServiceStatus = (typeof Service_STATUSES)[number];

export const DEFAULT_REQUEST_STATUS = 'submitted' as const;
