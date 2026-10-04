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

import { ModalContext } from './ModalContext';
import { type ChemMasterData, ModalType } from './type';

export const OperationsSection = () => {
  const { data } = useBackend<ChemMasterData>();
  const { container, default_name } = data;
  const { maxVolume } = container ?? { maxVolume: 100 };
  const [item_name, set_item_name] = useState('');
  const operation_height = 3;
  const margin_bottom = -0.5;

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
        <Stack.Item mb={margin_bottom} height={operation_height}>
          <MakePill max_volume={maxVolume} item_name={item_name} />
        </Stack.Item>
        <Stack.Item mb={margin_bottom} height={operation_height}>
          <MakePills max_volume={maxVolume} item_name={item_name} />
        </Stack.Item>
        <Stack.Item mb={margin_bottom} height={operation_height}>
          <MakeBottle item_name={item_name} />
        </Stack.Item>
        <Stack.Item mb={margin_bottom} height={operation_height}>
          <MakePatch item_name={item_name} />
        </Stack.Item>
        <Stack.Item mb={margin_bottom} height={operation_height}>
          <MakePatches item_name={item_name} />
        </Stack.Item>
      </Stack>
    </Section>
  );
};

const IconButtonControl = (props) => {
  const { onClick, imageb64 } = props;
  return (
    <LabeledControls.Item label="">
      <Button tooltip="Change type" tooltipPosition="top" onClick={onClick}>
        <Image
          height="32px"
          width="32px"
          src={`data:image/png;base64,${imageb64}`}
          style={{
            verticalAlign: 'middle',
          }}
        />
      </Button>
    </LabeledControls.Item>
  );
};

const AmountInputControl = (props) => {
  const { set_amount, current_amount, max_amount } = props;
  return (
    <LabeledControls.Item label="">
      <NumberInput
        width={5}
        format={(value) => value + 'u'}
        value={current_amount}
        minValue={5}
        maxValue={max_amount}
        step={1}
        onChange={(value) => set_amount(Math.round(value))}
      />
    </LabeledControls.Item>
  );
};

const MakeButtonControl = (props) => {
  const { text, onClick } = props;
  return (
    <LabeledControls.Item label="">
      <Button onClick={onClick} width={13}>
        {text}
      </Button>
    </LabeledControls.Item>
  );
};

const CheckboxControl = (props) => {
  const { label, checked, set_function } = props;
  return (
    <LabeledControls.Item label="">
      <Button.Checkbox checked={checked} onClick={() => set_function(!checked)}>
        {label}
      </Button.Checkbox>
    </LabeledControls.Item>
  );
};

const MakePill = (props) => {
  const { act, data } = useBackend<ChemMasterData>();

  const { item_name, max_volume } = props;
  const [single_pill_amount, set_single_pill_amount] = useSharedState(
    'single_pill_amount',
    max_volume,
  );

  const { pill_icons } = data;
  const { openModal } = useContext(ModalContext);
  const [icon_singlepill, set_icon_singlepill] = useSharedState(
    'icon_singlepill',
    0,
  );

  return (
    <>
      <LabeledControls>
        <IconButtonControl
          onClick={() => openModal(ModalType.SinglePill, set_icon_singlepill)}
          imageb64={pill_icons ? pill_icons[icon_singlepill] : undefined}
        />
        <MakeButtonControl
          text="Create single pill"
          onClick={() =>
            act('makepill', {
              item_name,
              amount: single_pill_amount,
              icon: icon_singlepill,
            })
          }
        />
        <AmountInputControl
          set_amount={set_single_pill_amount}
          current_amount={single_pill_amount}
          max_amount={max_volume}
        />
      </LabeledControls>
    </>
  );
};

const MakePills = (props) => {
  const { act, data } = useBackend<ChemMasterData>();

  const { item_name, max_volume } = props;
  const [use_bottle, set_use_bottle] = useSharedState('use_bottle', true);
  const [pills_amount, set_pills_amount] = useSharedState(
    'multiple_pills_amount',
    5,
  );

  const { pill_icons } = data;
  const { openModal } = useContext(ModalContext);
  const [icon_multiplepills, set_icon_multiplepills] = useSharedState(
    'icon_multiplepills',
    0,
  );

  return (
    <Box>
      <LabeledControls>
        <IconButtonControl
          onClick={() =>
            openModal(ModalType.MultiplePills, set_icon_multiplepills)
          }
          imageb64={pill_icons ? pill_icons[icon_multiplepills] : undefined}
        />
        <MakeButtonControl
          text="Create multiple pills"
          onClick={() =>
            act('makepills', {
              item_name,
              amount: pills_amount,
              use_bottle: use_bottle,
              icon: icon_multiplepills,
            })
          }
        />
        <AmountInputControl
          set_amount={set_pills_amount}
          current_amount={pills_amount}
          max_amount={max_volume}
        />
        <CheckboxControl
          label="Use bottle"
          checked={use_bottle}
          set_function={set_use_bottle}
        />
      </LabeledControls>
    </Box>
  );
};

function MakeBottle(props) {
  const { act, data } = useBackend<ChemMasterData>();

  const [bottle_amount, set_bottle_amount] = useSharedState(
    'bottle_amount',
    50,
  );

  const { item_name } = props;
  const { bottle_icons } = data;
  const { openModal } = useContext(ModalContext);
  const [icon_bottle, set_icon_bottle] = useSharedState('icon_bottle', 2);
  const set_icon = (index) => {
    set_icon_bottle(index);
    set_bottle_amount(bottle_icons[index][0]); // set maximum value
  };

  return (
    <Box>
      <LabeledControls>
        <IconButtonControl
          onClick={() => openModal(ModalType.Bottle, set_icon)}
          imageb64={bottle_icons ? bottle_icons[icon_bottle][1] : undefined}
        />
        <MakeButtonControl
          text="Create bottle"
          onClick={() =>
            act('makebottle', {
              item_name,
              amount: bottle_amount,
              bottle: icon_bottle,
            })
          }
        />
        <AmountInputControl
          set_amount={set_bottle_amount}
          current_amount={bottle_amount}
          max_amount={bottle_icons ? bottle_icons[icon_bottle][0] : 50}
        />
      </LabeledControls>
    </Box>
  );
}

function MakePatch(props) {
  const { act, data } = useBackend<ChemMasterData>();

  const [single_patch_amount, set_single_patch_amount] = useSharedState(
    'single_patch_amount',
    30,
  );

  const { item_name } = props;
  const { patch_icons } = data;
  const { openModal } = useContext(ModalContext);
  const [icon_singlepatch, set_icon_singlepatch] = useSharedState(
    'icon_singlepatch',
    1,
  );
  const set_icon = (index) => {
    set_icon_singlepatch(index);
    set_single_patch_amount(patch_icons[index][0]); // set maximum value
  };

  return (
    <Box>
      <LabeledControls>
        <IconButtonControl
          onClick={() => openModal(ModalType.SinglePatch, set_icon)}
          imageb64={patch_icons ? patch_icons[icon_singlepatch][1] : undefined}
        />
        <MakeButtonControl
          text="Create single patch"
          onClick={() =>
            act('makepatch', {
              item_name,
              amount: single_patch_amount,
              patch: icon_singlepatch,
            })
          }
        />
        <AmountInputControl
          set_amount={set_single_patch_amount}
          current_amount={single_patch_amount}
          max_amount={patch_icons ? patch_icons[icon_singlepatch][0] : 30}
        />
      </LabeledControls>
    </Box>
  );
}

function MakePatches(props) {
  const { act, data } = useBackend<ChemMasterData>();
  const [use_box, set_use_box] = useSharedState('use_box', true);
  const [patches_amount, set_patches_amount] = useSharedState(
    'multiple_patches_amount',
    30,
  );

  const { item_name } = props;
  const { patch_icons } = data;
  const { openModal } = useContext(ModalContext);
  const [icon_multiplepatches, set_icon_multiplepatches] = useSharedState(
    'icon_multiplepatches',
    1,
  );
  const set_icon = (index) => {
    set_icon_multiplepatches(index);
    set_patches_amount(patch_icons[index][0]); // set maximum value
  };

  return (
    <Box>
      <LabeledControls>
        <IconButtonControl
          onClick={() => openModal(ModalType.MultiplePatches, set_icon)}
          imageb64={
            patch_icons ? patch_icons[icon_multiplepatches][1] : undefined
          }
        />
        <MakeButtonControl
          text="Create multiple patches"
          onClick={() =>
            act('makepatches', {
              item_name,
              amount: patches_amount,
              use_box: use_box,
              patch: icon_multiplepatches,
            })
          }
        />
        <AmountInputControl
          set_amount={set_patches_amount}
          current_amount={patches_amount}
          max_amount={patch_icons ? patch_icons[icon_multiplepatches][0] : 30}
        />
        <CheckboxControl
          label="Use patch box"
          checked={use_box}
          set_function={set_use_box}
        />
      </LabeledControls>
    </Box>
  );
}
