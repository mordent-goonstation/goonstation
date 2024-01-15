/**
 * @file
 * @copyright 2022
 * @author glowbold (https://github.com/pgmzeta)
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { useBackend } from '../../../backend';
import { Button, LabeledList, Section } from '../../../components';
import { AvailableCellsSection } from './AvailableCellsSection';
import { AvailableDisksSection } from './AvailableDisksSection';
import { StandardAvailableSection } from './StandardAvailableSection';
import type { CyborgDockingStationData } from '../type';

export const SuppliesSection = (_props: unknown, context) => {
  const { act, data } = useBackend<CyborgDockingStationData>(context);
  const { allow_self_service, cabling, cells, clothes, disks, fuel, modules, upgrades, viewer_is_robot } = data;
  const handleToggleSelfService = () => act('self-service');
  const handleInstallModule = (moduleRef: string) => act('module-install', { moduleRef });
  const handleEjectModule = (moduleRef: string) => act('module-eject', { moduleRef });
  const handleInstallClothing = (clothingRef: string) => act('clothing-install', { clothingRef });
  const handleEjectClothing = (clothingRef: string) => act('clothing-eject', { clothingRef });
  const handleInstallUpgrade = (upgradeRef: string) => act('upgrade-install', { upgradeRef });
  const handleEjectUpgrade = (upgradeRef: string) => act('upgrade-eject', { upgradeRef });
  const handleInstallCell = (cellRef: string) => act('cell-install', { cellRef });
  const handleEjectCell = (cellRef: string) => act('cell-eject', { cellRef });
  const handleInstallDisk = (diskRef: string) => act('disk-install', { diskRef });
  const handleEjectDisk = (diskRef: string) => act('disk-eject', { diskRef });
  return (
    <Section title="Supplies">
      <LabeledList>
        <LabeledList.Item label="Welding Fuel">{fuel}</LabeledList.Item>
        <LabeledList.Item label="Wire Cabling">{cabling}</LabeledList.Item>
        <LabeledList.Item label="Self Service">
          <Button.Checkbox
            tooltip="Toggle self-service."
            checked={allow_self_service}
            disabled={viewer_is_robot}
            onClick={handleToggleSelfService}>
            {allow_self_service ? 'Enabled' : 'Disabled'}
          </Button.Checkbox>
        </LabeledList.Item>
      </LabeledList>
      <StandardAvailableSection
        items={modules}
        onInstall={handleInstallModule}
        onEject={handleEjectModule}
        title="Modules"
      />
      <StandardAvailableSection
        items={upgrades}
        onInstall={handleInstallUpgrade}
        onEject={handleEjectUpgrade}
        title="Upgrades"
      />
      <AvailableCellsSection items={cells} onInstall={handleInstallCell} onEject={handleEjectCell} />
      <AvailableDisksSection items={disks} onInstall={handleInstallDisk} onEject={handleEjectDisk} />
      <StandardAvailableSection
        items={clothes}
        onInstall={handleInstallClothing}
        onEject={handleEjectClothing}
        title="Upgrades"
      />
    </Section>
  );
};
