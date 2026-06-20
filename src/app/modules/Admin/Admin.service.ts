import { Service_STATUSES } from '../../constants';
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
  _id: unknown;
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  serviceType?: string;
  createdAt: Date;
  status?: string;
  additionalInformation?: string;
};

type QuoteModel = {
  find: (filter: Record<string, unknown>) => {
    select: (fields: string) => { lean: () => Promise<QuoteRow[]> };
  };
};

// Every submitted-quote collection across all service modules (mirrors Draft.service.ts).
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

const QUOTE_FIELDS =
  'fullName phoneNumber emailAddress serviceType createdAt status additionalInformation';

// Status badges shown in meta — every status except draft, in enum order.
const COUNTED_STATUSES = Object.values(Service_STATUSES).filter(
  status => status !== Service_STATUSES.DRAFT,
);

// `All` plus a per-status tally over the given (non-draft) rows.
const buildStatusCounts = (rows: QuoteRow[]) => {
  const counts: Record<string, number> = { All: rows.length };
  COUNTED_STATUSES.forEach(status => {
    counts[status] = 0;
  });

  rows.forEach(row => {
    if (row.status && row.status in counts) {
      counts[row.status] += 1;
    }
  });

  return counts;
};

type TGetAllQuotesFilters = {
  status?: string;
  serviceType?: string;
  page?: number;
  limit?: number;
};

const getAllQuotes = async (filters: TGetAllQuotesFilters) => {
  const { status, serviceType } = filters;

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;

  // Base set: all non-draft quotes (optionally narrowed by serviceType). Drafts
  // are internal-only and never exposed through this endpoint.
  const baseQuery: Record<string, unknown> = {
    status: { $ne: Service_STATUSES.DRAFT },
  };

  if (serviceType) {
    baseQuery.serviceType = serviceType;
  }

  const quotesPerModel = await Promise.all(
    quoteModels.map(model => model.find(baseQuery).select(QUOTE_FIELDS).lean()),
  );

  const allQuotes = quotesPerModel.flat();

  // Counts are independent of the status filter so every badge always shows.
  const statusCounts = buildStatusCounts(allQuotes);

  // The status filter only narrows the rows actually returned in `data`.
  const filtered = (
    status ? allQuotes.filter(q => q.status === status) : allQuotes
  ).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const total = filtered.length;
  const totalPage = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  const data = filtered.slice(skip, skip + limit);

  return {
    meta: { page, limit, total, totalPage, ...statusCounts },
    data,
  };
};

export const AdminService = {
  getAllQuotes,
};
