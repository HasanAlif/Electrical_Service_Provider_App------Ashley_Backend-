import httpStatus from 'http-status';
import { Service_STATUSES } from '../../constants';
import { AppError } from '../../utils';
import { serviceModels } from '../serviceModels';

type QuoteRow = {
  serviceType?: string;
  status?: string;
  additionalInformation?: string;
  createdAt: Date;
};

type LeanQuery = { lean: () => Promise<QuoteRow[]> };

type QuoteModel = {
  find: (filter: Record<string, unknown>) => {
    select: (fields: string) => LeanQuery;
  };
};

// Every submitted-quote collection, from the shared registry (src/app/modules/
// serviceModels.ts) so Quotes/Draft/Admin can never drift out of sync.
const quoteModels: QuoteModel[] = serviceModels.map(
  model => model as unknown as QuoteModel,
);

const MONTH_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// "20 June, 2026" (server local time, no leading zero).
const formatSubmitted = (date: Date) => {
  const dt = new Date(date);
  return `${dt.getDate()} ${MONTH_FULL[dt.getMonth()]}, ${dt.getFullYear()}`;
};

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Every status a submitted quote can have (everything except draft).
const NON_DRAFT_STATUSES: string[] = Object.values(Service_STATUSES).filter(
  status => status !== Service_STATUSES.DRAFT,
);

type TMyQuotesFilters = {
  status?: string;
  searchQuery?: string;
};

const getAllMyQuotes = async (
  userId: string,
  filters: TMyQuotesFilters = {},
) => {
  const status = (filters.status ?? '').trim().toLowerCase();
  const searchQuery = (filters.searchQuery ?? '').trim();

  // This user's submitted quotes; drafts are never included.
  const query: Record<string, unknown> = {
    createdBy: userId,
    status: { $ne: Service_STATUSES.DRAFT },
  };

  if (status && status !== 'all') {
    if (!NON_DRAFT_STATUSES.includes(status)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `status must be 'all' or one of: ${NON_DRAFT_STATUSES.join(', ')}!`,
      );
    }
    query.status = status;
  }

  // searchQuery filters by serviceType.
  if (searchQuery) {
    query.serviceType = { $regex: escapeRegex(searchQuery), $options: 'i' };
  }

  const rowsPerModel = await Promise.all(
    quoteModels.map(model =>
      model
        .find(query)
        .select('serviceType status additionalInformation createdAt')
        .lean(),
    ),
  );
  const rows = rowsPerModel.flat();

  // With a search term → relevance rank on serviceType (exact > starts-with >
  // contains), createdAt desc tiebreak. Without → newest first.
  let sorted: QuoteRow[];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    const score = (value?: string) => {
      if (!value) return 0;
      const v = value.toLowerCase();
      if (v === q) return 3;
      if (v.startsWith(q)) return 2;
      if (v.includes(q)) return 1;
      return 0;
    };

    sorted = rows
      .map(row => ({ row, score: score(row.serviceType) }))
      .sort(
        (a, b) =>
          b.score - a.score ||
          new Date(b.row.createdAt).getTime() -
            new Date(a.row.createdAt).getTime(),
      )
      .map(item => item.row);
  } else {
    sorted = rows.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  return sorted.map(row => ({
    serviceType: row.serviceType,
    Submitted: formatSubmitted(row.createdAt),
    additionalNotes: row.additionalInformation ?? '',
    status: row.status,
  }));
};

export const QuotesService = {
  getAllMyQuotes,
};
