/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { useBackend } from '../../../backend';
import { Button, Flex, Section, Tabs } from '../../../components';
import { EmptyPlaceholder } from '../EmptyPlaceholder';
import { ejectModuleAct, moveToolAct, removeToolAct, resetModuleAct, selectModuleAct } from '../actions';
import { Direction, ModuleType } from '../constants';
import { CyborgModuleRewriterData, ModuleRef, ToolRef } from '../types';
import { Module } from './Module';

// width hard-coded to allow display of widest current module name
// without resizing when ejected/reset
const ModuleListWidth = 18;

export const ModuleView = (props, context) => {
  const { act, data } = useBackend<CyborgModuleRewriterData>(context);
  const {
    availableModules,
    selectedModule,
  } = data;
  const {
    ref: selectedModuleRef,
    tools = [],
  } = selectedModule || {};

  const handleEjectModule = (moduleRef: ModuleRef) => (
    ejectModuleAct(act, { moduleRef })
  );
  const handleMoveToolDown = (toolRef: ToolRef) => (
    moveToolAct(act, {
      dir: Direction.Down,
      moduleRef: selectedModuleRef,
      toolRef,
    })
  );
  const handleMoveToolUp = (toolRef: ToolRef) => (
    moveToolAct(act, {
      dir: Direction.Up,
      moduleRef: selectedModuleRef,
      toolRef,
    })
  );
  const handleRemoveTool = (toolRef: ToolRef) => (
    removeToolAct(act, {
      moduleRef: selectedModuleRef,
      toolRef,
    })
  );
  const handleResetModule = (moduleId: ModuleType) => (
    resetModuleAct(act, {
      moduleId,
      moduleRef: selectedModuleRef,
    })
  );
  const handleSelectModule = (moduleRef: ModuleRef) => (
    selectModuleAct(act, { moduleRef })
  );

  return (
    availableModules.length > 0
      ? (
        <Flex>
          <Flex.Item width={ModuleListWidth} mr={1}>
            <Section title="Modules" fitted>
              <Tabs vertical>
                {
                  availableModules.map(module => {
                    const {
                      ref: moduleRef,
                      name,
                    } = module;
                    const ejectButton = (
                      <Button
                        icon="eject"
                        color="transparent"
                        onClick={() => handleEjectModule(moduleRef)}
                        title={`Eject ${name}`}
                      />
                    );
                    return (
                      <Tabs.Tab
                        key={moduleRef}
                        onClick={() => handleSelectModule(moduleRef)}
                        rightSlot={ejectButton}
                        selected={moduleRef === selectedModuleRef}
                      >
                        {name}
                      </Tabs.Tab>
                    );
                  })
                }
              </Tabs>
            </Section>
          </Flex.Item>
          <Flex.Item grow={1} basis={0}>
            {
              selectedModuleRef
                ? (
                  <Module
                    onMoveToolDown={handleMoveToolDown}
                    onMoveToolUp={handleMoveToolUp}
                    onRemoveTool={handleRemoveTool}
                    onResetModule={handleResetModule}
                    tools={tools}
                  />
                )
                : (
                  <Section>
                    <EmptyPlaceholder>No module selected</EmptyPlaceholder>
                  </Section>
                )
            }
          </Flex.Item>
        </Flex>
      )
      : (
        <Section>
          <EmptyPlaceholder>No modules inserted</EmptyPlaceholder>
        </Section>
      )
  );
};
