/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { useContext, useState } from 'react';
import { useBackend, useSharedState } from 'tgui/backend';
import {
  Box,
  Button,
  Image,
  Input,
  LabeledControls,
  NumberInput,
  Section,
  Stack,
} from 'tgui-core/components';

import { groupIcons } from './iconGroups';
import { ModalContext } from './ModalContext';
import type { ChemMasterData, ItemIcon } from './type';

export const OperationsSection = () => {
  const { act, data } = useBackend<ChemMasterData>();
  const { container, default_name } = data;
  const maxVolume = container?.maxVolume ?? 100;
  const [item_name, set_item_name] = useState('');

  const pillIcons: ItemIcon[] = (data.pill_options ?? []).map((src) => ({
    src,
  }));
  const bottleIcons: ItemIcon[] = (data.bottle_options ?? []).map(
    ([capacity, src]) => ({ src, capacity }),
  );
  const patchIcons: ItemIcon[] = (data.patch_options ?? []).map(
    ([capacity, src]) => ({ src, capacity }),
  );
  const ampouleIcons: ItemIcon[] = data.ampoule_options
    ? [
        {
          capacity: data.ampoule_options[0][0],
          src: data.ampoule_options[0][1],
        },
      ]
    : [];

  return (
    <Section
      title="Operations"
      buttons={
        <Box align="left" as="span">
          {'Name: '}
          <Input
            value={item_name}
            placeholder={default_name ?? ''}
            onBlur={(value) => {
              set_item_name(value);
            }}
            maxLength={data.name_max_len}
          />
        </Box>
      }
    >
      <Stack vertical>
        <MakeItem
          id="single_pill"
          label="Create single pill"
          iconTitle="Select Pill"
          icons={pillIcons}
          defaultIcon={0}
          defaultAmount={maxVolume}
          maxVolume={maxVolume}
          onMake={({ icon, amount }) =>
            act('makepill', { item_name, amount, icon })
          }
        />
        <MakeItem
          id="multiple_pills"
          label="Create multiple pills"
          iconTitle="Select Pill"
          icons={pillIcons}
          defaultIcon={0}
          defaultAmount={5}
          maxVolume={maxVolume}
          checkboxLabel="Use bottle"
          onMake={({ icon, amount, checked }) =>
            act('makepills', { item_name, amount, use_bottle: checked, icon })
          }
        />
        <MakeItem
          id="bottle"
          label="Create bottle"
          iconTitle="Select Bottle"
          icons={bottleIcons}
          defaultIcon={1}
          defaultAmount={50}
          maxVolume={maxVolume}
          onMake={({ icon, amount }) =>
            act('makebottle', { item_name, amount, bottle: icon })
          }
        />
        <MakeItem
          id="ampoule"
          label="Create ampoule"
          iconTitle="Select Ampoule"
          icons={ampouleIcons}
          defaultIcon={0}
          defaultAmount={5}
          maxVolume={5}
          onMake={({ amount }) => act('makeampoule', { item_name, amount })}
        />
        <MakeItem
          id="single_patch"
          label="Create single patch"
          iconTitle="Select Patch"
          icons={patchIcons}
          defaultIcon={1}
          defaultAmount={30}
          maxVolume={maxVolume}
          onMake={({ icon, amount }) =>
            act('makepatch', { item_name, amount, patch: icon })
          }
        />
        <MakeItem
          id="multiple_patches"
          label="Create multiple patches"
          iconTitle="Select Patch"
          icons={patchIcons}
          defaultIcon={1}
          defaultAmount={30}
          maxVolume={maxVolume}
          checkboxLabel="Use patch box"
          onMake={({ icon, amount, checked }) =>
            act('makepatches', {
              item_name,
              amount,
              use_box: checked,
              patch: icon,
            })
          }
        />
      </Stack>
    </Section>
  );
};

interface MakeOptions {
  icon: number;
  amount: number;
  checked: boolean;
}

interface MakeItemProps {
  // Prefix for this row's shared state keys
  id: string;
  label: string;
  iconTitle: string;
  icons: ItemIcon[];
  defaultIcon: number;
  defaultAmount: number;
  // Amount limit for icons without a fixed capacity
  maxVolume: number;
  checkboxLabel?: string;
  onMake: (options: MakeOptions) => void;
}

const MakeItem = (props: MakeItemProps) => {
  const {
    id,
    label,
    iconTitle,
    icons,
    defaultIcon,
    defaultAmount,
    maxVolume,
    checkboxLabel,
    onMake,
  } = props;
  const { openModal } = useContext(ModalContext);
  const [icon, setIcon] = useSharedState(`${id}_icon`, defaultIcon);
  const [amount, setAmount] = useSharedState(`${id}_amount`, defaultAmount);
  const [checked, setChecked] = useSharedState(`${id}_checked`, true);
  const maxAmount = icons[icon]?.capacity ?? maxVolume;

  const selectIcon = (index: number) => {
    setIcon(index);
    // Fixed-capacity containers default to being filled
    const capacity = icons[index]?.capacity;
    if (capacity !== undefined) {
      setAmount(capacity);
    }
  };

  return (
    <Stack.Item mb={-0.5} height={3}>
      <LabeledControls>
        <LabeledControls.Item label="">
          <Button
            tooltip={icons.length > 1 ? 'Change type' : undefined}
            tooltipPosition="top"
            onClick={() =>
              openModal({
                title: iconTitle,
                groups: groupIcons(icons),
                onSelectIcon: selectIcon,
              })
            }
          >
            <Image
              height="32px"
              width="32px"
              src={`data:image/png;base64,${icons[icon]?.src}`}
              style={{
                verticalAlign: 'middle',
              }}
            />
          </Button>
        </LabeledControls.Item>
        <LabeledControls.Item label="">
          <Button onClick={() => onMake({ icon, amount, checked })} width={13}>
            {label}
          </Button>
        </LabeledControls.Item>
        <LabeledControls.Item label="">
          <NumberInput
            width={5}
            format={(value) => value + 'u'}
            value={amount}
            minValue={5}
            maxValue={maxAmount}
            step={1}
            onChange={(value) => setAmount(Math.round(value))}
          />
        </LabeledControls.Item>
        {checkboxLabel !== undefined && (
          <LabeledControls.Item label="">
            <Button.Checkbox
              checked={checked}
              onClick={() => setChecked(!checked)}
            >
              {checkboxLabel}
            </Button.Checkbox>
          </LabeledControls.Item>
        )}
      </LabeledControls>
    </Stack.Item>
  );
};
