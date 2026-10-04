/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Section } from 'tgui-core/components';

import type { ToolData } from '../../type/data';
import { Tools } from './Tools';

interface ModuleProps {
  onMoveToolDown: (itemRef: string) => void;
  onMoveToolUp: (itemRef: string) => void;
  onRemoveTool: (itemRef: string) => void;
  tools: ToolData[];
}

export const ModuleDetail = (props: ModuleProps) => {
  const { onMoveToolDown, onMoveToolUp, onRemoveTool, tools } = props;
  const [selectedToolRef, setSelectedToolRef] = useState<string | undefined>(
    undefined,
  );
  const handleRemoveTool = useCallback(
    (itemRef: string) => {
      const toolIndex = tools.findIndex((tool) => tool.itemRef === itemRef);
      setSelectedToolRef(tools[toolIndex + 1]?.itemRef);
      onRemoveTool(itemRef);
    },
    [onRemoveTool, tools],
  );
  const resolvedSelectedToolRef = useMemo(
    () =>
      selectedToolRef &&
      tools.find((tool) => tool.itemRef === selectedToolRef)?.itemRef,
    [selectedToolRef, tools],
  );
  useEffect(() => {
    if (selectedToolRef && !resolvedSelectedToolRef) {
      setSelectedToolRef(undefined);
    }
  }, [resolvedSelectedToolRef, selectedToolRef]);
  const toolsButtons = (
    <OrganizeButtons
      itemRef={resolvedSelectedToolRef}
      onMoveDown={onMoveToolDown}
      onMoveUp={onMoveToolUp}
      onRemove={handleRemoveTool}
    />
  );
  return (
    <Section fill scrollable title="Tools" buttons={toolsButtons}>
      <Tools
        tools={tools}
        selectedToolRef={resolvedSelectedToolRef}
        onSelectTool={setSelectedToolRef}
      />
    </Section>
  );
};

interface OrganizeButtonsProps {
  onMoveDown: (itemRef: string) => void;
  onMoveUp: (itemRef: string) => void;
  onRemove: (itemRef: string) => void;
  itemRef: string | undefined;
}

const OrganizeButtons = (props: OrganizeButtonsProps) => {
  const { onMoveDown, onMoveUp, onRemove, itemRef } = props;
  const isItemSelected = !!itemRef;
  const handleMoveUpClick = useCallback(
    () => itemRef && onMoveUp(itemRef),
    [itemRef, onMoveUp],
  );
  const handleMoveDownClick = useCallback(
    () => itemRef && onMoveDown(itemRef),
    [itemRef, onMoveDown],
  );
  const handleRemoveClick = useCallback(
    () => itemRef && onRemove(itemRef),
    [itemRef, onRemove],
  );
  return (
    <>
      <Button
        icon="arrow-up"
        disabled={!isItemSelected}
        onClick={handleMoveUpClick}
        tooltip="Move Up"
      />
      <Button
        icon="arrow-down"
        disabled={!isItemSelected}
        onClick={handleMoveDownClick}
        tooltip="Move Down"
      />
      <Button
        icon="trash"
        disabled={!isItemSelected}
        onClick={handleRemoveClick}
        tooltip="Remove"
      />
    </>
  );
};
