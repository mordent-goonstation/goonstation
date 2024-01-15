/**
 * @file
 * @copyright 2024
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { Box, LabeledList, Section } from '../../../components';
import { DiskDisplay } from '../DiskDisplay';
import { DockingAllowedButton } from '../DockingAllowedButton';
import type { DiskData } from '../type';

interface AvailableDisksSectionProps {
  items: DiskData[];
  onEject: (ref: string) => void;
  onInstall: (ref: string) => void;
}

export const AvailableDisksSection = (props: AvailableDisksSectionProps) => {
  const { items, onEject, onInstall } = props;
  return (
    <Section title="Disks">
      {items?.length > 0 ? (
        <LabeledList>
          {items.map(({ name, item_ref, ...rest }) => {
            return (
              <div key={item_ref}>
                <LabeledList.Item
                  verticalAlign="middle"
                  label={name}
                  buttons={
                    <>
                      <DockingAllowedButton onClick={() => onInstall(item_ref)} icon="plus" tooltip="Add to occupant" />
                      <DockingAllowedButton
                        onClick={() => onEject(item_ref)}
                        icon="eject"
                        tooltip="Eject from station"
                      />
                    </>
                  }>
                  <DiskDisplay {...rest} />
                </LabeledList.Item>
              </div>
            );
          })}
        </LabeledList>
      ) : (
        <Box as="div">None Stored</Box>
      )}
    </Section>
  );
};
