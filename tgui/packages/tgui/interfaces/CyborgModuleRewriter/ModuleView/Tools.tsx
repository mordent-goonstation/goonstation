/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { InfernoNode, MouseEventHandler } from 'inferno';
import { Button } from '../../../components';
import { EmptyPlaceholder } from '../EmptyPlaceholder';
import { ToolData, ToolRef } from '../types';
import * as styles from '../styles';

interface ToolProps {
  children: InfernoNode,
  onMoveToolDown: MouseEventHandler<HTMLButtonElement>,
  onMoveToolUp: MouseEventHandler<HTMLButtonElement>,
  onRemoveTool: MouseEventHandler<HTMLButtonElement>,
}

const Tool = (props: ToolProps) => {
  const {
    children,
    onMoveToolDown,
    onMoveToolUp,
    onRemoveTool,
  } = props;
  return (
    <div>
      <Button icon="arrow-up" onClick={onMoveToolUp} title="Move Up" />
      <Button icon="arrow-down" onClick={onMoveToolDown} title="Move Down" />
      <Button icon="trash" onClick={onRemoveTool} title="Remove" />
      <span className={styles.ToolLabel}>{children}</span>
    </div>
  );
};

interface ToolsProps {
  onMoveToolDown: (toolRef: ToolRef) => void,
  onMoveToolUp: (toolRef: ToolRef) => void,
  onRemoveTool: (toolRef: ToolRef) => void,
  tools: ToolData[],
}

export const Tools = (props: ToolsProps) => {
  const {
    onMoveToolDown,
    onMoveToolUp,
    onRemoveTool,
    tools,
  } = props;
  return (
    <div>
      {
        tools.length > 0
          ? (
            tools.map(tool => {
              const {
                name,
                ref: toolRef,
              } = tool;
              return (
                <Tool
                  onMoveToolDown={() => onMoveToolDown(toolRef)}
                  onMoveToolUp={() => onMoveToolUp(toolRef)}
                  onRemoveTool={() => onRemoveTool(toolRef)}
                  key={toolRef}
                >
                  {name}
                </Tool>
              );
            })
          )
          : <EmptyPlaceholder>Module has no tools</EmptyPlaceholder>
      }
    </div>
  );
};
