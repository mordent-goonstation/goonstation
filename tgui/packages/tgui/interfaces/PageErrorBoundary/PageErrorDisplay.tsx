import { Section } from 'tgui-core/components';

import { useBackend } from '../../backend';
import { Window } from '../../layouts';

interface Props {
  error: unknown;
}

export const PageErrorDisplay = (props: Props) => {
  const { error } = props;
  const { data } = useBackend<unknown>();
  return (
    <Window title="Error">
      <Window.Content scrollable>
        <Section title="Actions">TODO</Section>
        <Section title="Data">{JSON.stringify(data)}</Section>
      </Window.Content>
    </Window>
  );
};
