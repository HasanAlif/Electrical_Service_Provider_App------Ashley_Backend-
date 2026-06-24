import httpStatus from 'http-status';
import { Service_STATUSES } from '../../constants';
import { AppError } from '../../utils';
import AccessoryBuildingPowerModel from '../AccessoryBuildingPower/AccessoryBuildingPower.model';
import CellingFansModel from '../CellingFans/CellingFans.model';
import DedicatedCircuitModel from '../DedicatedCircuit/DedicatedCircuit.model';
import DockPowerModel from '../DockPower/DockPower.model';
import ElectricModel from '../Electric/Electric.model';
import EVChargerInstallationModel from '../EVChargerInstallation/EVChargerInstallation.model';
import ExhaustFansModel from '../ExhaustFans/ExhaustFans.model';
import GenaratorModel from '../Genarator/Genarator.model';
import HomeSurgeProtectionModel from '../HomeSurgeProtection/HomeSurgeProtection.model';
import HotTubModel from '../HotTub/HotTub.model';
import LightingModel from '../Lighting/Lighting.model';
import NewConstructionModel from '../NewConstruction/NewConstruction.model';
import OutletsModel from '../Outlets/Outlets.model';
import PanelUpgradeReplacementModel from '../PanelUpgradeReplacement/PanelUpgradeReplacement.model';
import RemodelingModel from '../Remodeling/Remodeling.model';
import ServiceCallModel from '../ServiceCall/ServiceCall.model';
import StarlinkModel from '../Starlink/Starlink.model';
import SwitchesModel from '../Switches/Switches.model';

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

// Every submitted-quote collection (mirrors Admin.service.ts / Draft.service.ts).
// New service modules must be added here too.
const quoteModels: QuoteModel[] = [
  AccessoryBuildingPowerModel,
  CellingFansModel,
  DedicatedCircuitModel,
  DockPowerModel,
  ElectricModel,
  EVChargerInstallationModel,
  ExhaustFansModel,
  GenaratorModel,
  HomeSurgeProtectionModel,
  HotTubModel,
  LightingModel,
  NewConstructionModel,
  OutletsModel,
  PanelUpgradeReplacementModel,
  RemodelingModel,
  ServiceCallModel,
  StarlinkModel,
  SwitchesModel,
].map(model => model as unknown as QuoteModel);

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
