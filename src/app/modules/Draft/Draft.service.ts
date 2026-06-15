import { Service_STATUSES } from '../../constants';
import AccessoryBuildingPowerModel from '../AccessoryBuildingPower/AccessoryBuildingPower.model';
import DockPowerModel from '../DockPower/DockPower.model';
import ElectricModel from '../Electric/Electric.model';
import EVChargerInstallationModel from '../EVChargerInstallation/EVChargerInstallation.model';
import GenaratorModel from '../Genarator/Genarator.model';
import HomeSurgeProtectionModel from '../HomeSurgeProtection/HomeSurgeProtection.model';
import HotTubModel from '../HotTub/HotTub.model';
import NewConstructionModel from '../NewConstruction/NewConstruction.model';
import PanelUpgradeReplacementModel from '../PanelUpgradeReplacement/PanelUpgradeReplacement.model';
import RemodelingModel from '../Remodeling/Remodeling.model';
import ServiceCallModel from '../ServiceCall/ServiceCall.model';
import StarlinkModel from '../Starlink/Starlink.model';

type DraftModel = {
  find: (filter: Record<string, unknown>) => Promise<unknown[]>;
};

const getAllMyDraftsFromDB = async (userId: string) => {
  const models = [
    {
      name: 'AccessoryBuildingPower',
      model: AccessoryBuildingPowerModel as DraftModel,
    },
    { name: 'DockPower', model: DockPowerModel as DraftModel },
    { name: 'Electric', model: ElectricModel as DraftModel },
    {
      name: 'EVChargerInstallation',
      model: EVChargerInstallationModel as DraftModel,
    },
    { name: 'Generator', model: GenaratorModel as DraftModel },
    {
      name: 'HomeSurgeProtection',
      model: HomeSurgeProtectionModel as DraftModel,
    },
    { name: 'HotTub', model: HotTubModel as DraftModel },
    { name: 'NewConstruction', model: NewConstructionModel as DraftModel },
    {
      name: 'PanelUpgradeReplacement',
      model: PanelUpgradeReplacementModel as DraftModel,
    },
    { name: 'Remodeling', model: RemodelingModel as DraftModel },
    { name: 'ServiceCall', model: ServiceCallModel as DraftModel },
    { name: 'Starlink', model: StarlinkModel as DraftModel },
  ];

  const draftPromises = models.map(async ({ name, model }) => {
    const drafts = await model.find({
      createdBy: userId,
      status: Service_STATUSES.DRAFT,
    });

    return {
      serviceName: name,
      count: drafts.length,
      data: drafts,
    };
  });

  const results = await Promise.all(draftPromises);

  // Filter out services with no drafts
  const filteredResults = results.filter(result => result.count > 0);

  return filteredResults;
};

export const DraftService = {
  getAllMyDraftsFromDB,
};
