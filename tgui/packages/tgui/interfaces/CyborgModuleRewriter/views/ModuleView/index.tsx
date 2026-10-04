/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { useCallback } from 'react';
import { Section, Stack } from 'tgui-core/components';

import { useBackend } from '../../../../backend';
import * as actions from '../../action';
import { ModuleDrive } from '../../components/ModuleDrive';
import { Direction } from '../../type/action';
import type { CyborgModuleRewriterData } from '../../type/data';
import { ModuleDetail } from './ModuleDetail';

export const ModuleView = () => {
  const { act, data } = useBackend<CyborgModuleRewriterData>();
  const { insertedModule } = data;
  const handleEjectModule = useCallback(() => actions.ejectModule(act), [act]);
  const handleChangeModule = useCallback(
    () => actions.changeInsertedModule(act),
    [act],
  );
  const handleMoveToolDown = useCallback(
    (itemRef: string) =>
      actions.moveTool(act, {
        dir: Direction.Down,
        itemRef,
      }),
    [act],
  );
  const handleMoveToolUp = useCallback(
    (itemRef: string) =>
      actions.moveTool(act, {
        dir: Direction.Up,
        itemRef,
      }),
    [act],
  );
  const handleRemoveTool = useCallback(
    (itemRef: string) => actions.removeTool(act, { itemRef }),
    [act],
  );
  const {
    itemRef: insertedModuleRef,
    name: moduleName,
    tools = [],
  } = insertedModule || {};
  const diskColor = 'blue';
  return (
    <Section fill title="Module">
      <Stack vertical fill>
        <Stack.Item align="center">
          <ModuleDrive
            onEject={handleEjectModule}
            onInsert={handleChangeModule}
            onContentClick={handleChangeModule}
          >
            {!!insertedModule && (
              <ModuleDrive.Module color={diskColor}>
                {moduleName}
              </ModuleDrive.Module>
            )}
          </ModuleDrive>
        </Stack.Item>
        {insertedModuleRef && (
          <ModuleDetail
            onMoveToolDown={handleMoveToolDown}
            onMoveToolUp={handleMoveToolUp}
            onRemoveTool={handleRemoveTool}
            tools={tools}
          />
        )}
      </Stack>
    </Section>
  );
};
