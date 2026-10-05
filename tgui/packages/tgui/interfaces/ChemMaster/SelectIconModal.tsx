/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { useContext } from 'react';
import { Button, Image, Modal, Section } from 'tgui-core/components';

import { ModalContext } from './ModalContext';
import type { IconEntry, IconModalOptions } from './type';

export const SelectIconModal = (props: IconModalOptions) => {
  const { title, groups, onSelectIcon } = props;
  const { closeModal } = useContext(ModalContext);

  const cancel_button = (
    <Button
      tooltip="Cancel"
      icon="times"
      color="red"
      mr={1}
      onClick={closeModal}
    />
  );

  const mapToButton = ({ src, index }: IconEntry) => (
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
        src={`data:image/png;base64,${src}`}
        style={{
          verticalAlign: 'middle',
        }}
      />
    </Button>
  );

  return (
    <Modal minWidth={20}>
      <Section title={title} buttons={cancel_button}>
        {groups.map(({ label, icons }) =>
          label === undefined ? (
            icons.map(mapToButton)
          ) : (
            <Section key={label} title={label}>
              {icons.map(mapToButton)}
            </Section>
          ),
        )}
      </Section>
    </Modal>
  );
};
