/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { useContext } from 'react';
import { useBackend } from 'tgui/backend';
import { Box, Button, Image, Modal, Section } from 'tgui-core/components';

import { ModalContext } from './ModalContext';
import { type ChemMasterData, type ModalContextState, ModalType } from './type';

export const SelectIconModal = (props: ModalContextState) => {
  const { modalType, onSelectIcon } = props;
  const { data } = useBackend<ChemMasterData>();
  const { closeModal } = useContext(ModalContext);

  let title: string;
  let icons: unknown[];
  let minWidth: number;
  switch (modalType) {
    case ModalType.SinglePill:
    case ModalType.MultiplePills:
      title = 'Select Pill';
      icons = data.pill_icons ?? [];
      minWidth = 10;
      break;
    case ModalType.Bottle:
      title = 'Select Bottle';
      icons = data.bottle_icons ?? [];
      minWidth = 12;
      break;
    case ModalType.SinglePatch:
    case ModalType.MultiplePatches:
      title = 'Select Patch';
      icons = data.patch_icons ?? [];
      minWidth = 12;
      break;
    default:
      return null;
  }
  const isPill =
    modalType === ModalType.SinglePill || modalType === ModalType.MultiplePills;

  const cancel_button = (
    <Button
      tooltip="Cancel"
      icon="times"
      color="red"
      mr={1}
      onClick={closeModal}
    />
  );

  const button_image = (item, index) => (
    <Button
      key={index}
      onClick={() => {
        onSelectIcon(index);
        closeModal();
      }}
    >
      <Image
        height="32px"
        width="32px"
        src={`data:image/png;base64,${isPill ? item : item[1]}`}
        style={{
          verticalAlign: 'middle',
        }}
      />
      {!isPill && (
        <Box textAlign="center" bold>
          {item[0]}u
        </Box>
      )}
    </Button>
  );

  return (
    <Modal>
      <Section title={title} buttons={cancel_button} minWidth={minWidth}>
        {icons.map(button_image)}
      </Section>
    </Modal>
  );
};
