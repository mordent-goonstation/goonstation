/**
 * @file
 * @copyright 2022 Saicchi
 * @author Saicchi (https://github.com/Saicchi)
 * @license ISC
 */

import { useBackend, useSharedState } from 'tgui/backend';
import {
  Box,
  Button,
  Dimmer,
  NumberInput,
  Section,
} from 'tgui-core/components';

import { NoContainer, ReagentGraph, ReagentList } from '../common/ReagentInfo';
import { capitalize } from '../common/stringUtils';
import { type ChemMasterData } from './type';

export const ReagentDisplay = () => {
  const { act, data } = useBackend<ChemMasterData>();
  const { container } = data;
  const { maxVolume } = container ?? { maxVolume: 100 };
  const hasContainer = !!container;
  const resolvedContainer = container ?? NoContainer;

  const [remove_amount, set_remove_amount] = useSharedState(
    'remove_amount',
    10,
  );

  return (
    <Section
      title={capitalize(resolvedContainer.name ?? 'Unknown Container')}
      buttons={
        <>
          <Button
            tooltip="Flush All"
            icon="times"
            color="red"
            disabled={!resolvedContainer.totalVolume}
            onClick={() => act('flushall')}
          />
          <Button
            tooltip="Eject"
            icon="eject"
            disabled={!hasContainer}
            onClick={() => act('eject')}
          />
          <Box align="left" as="span">
            {'Remove Amount: '}
            <NumberInput
              width={4}
              format={(value) => value + 'u'}
              value={remove_amount}
              minValue={1}
              maxValue={maxVolume}
              step={1}
              onChange={(value) => set_remove_amount(Math.round(value))}
            />
          </Box>
        </>
      }
    >
      {!hasContainer && (
        <Dimmer>
          <Button
            icon="eject"
            fontSize={1.5}
            onClick={() => act('insert')}
            bold
          >
            Insert Beaker
          </Button>
        </Dimmer>
      )}
      <ReagentGraph container={container} />
      <ReagentList
        container={container}
        renderButtons={(reagent) => {
          return (
            <>
              <Button
                px={0.75}
                mr={1.5}
                icon="search"
                color="green"
                tooltip="Analyze"
                onClick={() => act('analyze', { reagent_id: reagent.id })}
              />
              <Button
                px={0.75}
                mr={1.5}
                icon="filter"
                color="red"
                tooltip="Isolate"
                onClick={() => act('isolate', { reagent_id: reagent.id })}
              />
              <Button
                px={0.75}
                mr={1.5}
                icon="times"
                color="red"
                tooltip="Flush all"
                onClick={() => act('flush', { reagent_id: reagent.id })}
              />
              <Button
                px={0.75}
                icon="minus"
                color="yellow"
                tooltip="Flush variable amount of units"
                bold
                onClick={() =>
                  act('flushinput', {
                    reagent_id: reagent.id,
                    amount: remove_amount,
                  })
                }
              >
                {remove_amount}u
              </Button>
            </>
          );
        }}
        renderButtonsDeps={remove_amount}
      />
    </Section>
  );
};
