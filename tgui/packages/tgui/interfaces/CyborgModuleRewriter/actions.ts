import { Action } from './constants';
import {
  ActionType,
  EjectModuleActionPayload,
  MoveToolActionPayload,
  RemoveToolActionPayload,
  ResetModuleActionPayload,
  SelectModuleActionPayload,
} from './types';

export const ejectModuleAct: ActionType<EjectModuleActionPayload> = (
  (act, payload) => act(Action.EjectModule, payload)
);

export const moveToolAct: ActionType<MoveToolActionPayload> = (
  (act, payload) => act(Action.MoveTool, payload)
);

export const removeToolAct: ActionType<RemoveToolActionPayload> = (
  (act, payload) => act(Action.RemoveTool, payload)
);

export const resetModuleAct: ActionType<ResetModuleActionPayload> = (
  (act, payload) => act(Action.ResetModule, payload)
);

export const selectModuleAct: ActionType<SelectModuleActionPayload> = (
  (act, payload) => act(Action.SelectModule, payload)
);
