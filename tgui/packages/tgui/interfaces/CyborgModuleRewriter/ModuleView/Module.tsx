/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { Button, Section } from '../../../components';
import { ModuleType, moduleDefinitions } from '../constants';
import { ToolData } from '../types';
import { Tools } from './Tools';

interface ModuleProps {
  onMoveToolDown,
  onMoveToolUp,
  onRemoveTool,
  onResetModule: (moduleId: ModuleType) => void,
  tools: ToolData[],
}

export const Module = (props: ModuleProps) => {
  const {
    onMoveToolDown,
    onMoveToolUp,
    onRemoveTool,
    onResetModule,
    tools,
  } = props;

  return (
    <>
      <Section title="Preset">
        {
          moduleDefinitions.map(moduleDefinition => {
            const {
              id,
              name,
            } = moduleDefinition;
            return (
              <Button
                key={id}
                onClick={() => onResetModule(id)}
                title={name}
              >
                {name}
              </Button>
            );
          })
        }
      </Section>
      <Section title="Tools">
        <Tools
          onMoveToolDown={onMoveToolDown}
          onMoveToolUp={onMoveToolUp}
          onRemoveTool={onRemoveTool}
          tools={tools}
        />
      </Section>
    </>
  );
};
