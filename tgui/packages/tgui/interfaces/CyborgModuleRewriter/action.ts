/**
 * @file
 * @copyright 2021
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import type { MoveToolActionPayload, ToolActionPayload } from './type/action';
import { Action } from './type/action';

type Act = (action: string, payload?: object) => void;

const createSimpleAction = (action: Action) => (act: Act) =>
  act(action, undefined);

const createPayloadAction =
  <T extends object>(action: Action) =>
  (act: Act, payload: T) =>
    act(action, payload);

const ejectModule = createSimpleAction(Action.EjectModule);
const changeInsertedModule = createSimpleAction(Action.ChangeInsertedModule);
const moveTool = createPayloadAction<MoveToolActionPayload>(Action.MoveTool);
const removeTool = createPayloadAction<ToolActionPayload>(Action.RemoveTool);

export { changeInsertedModule, ejectModule, moveTool, removeTool };
