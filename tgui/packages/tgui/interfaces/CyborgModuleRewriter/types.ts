import { Act } from '../../backend';
import { Direction, ModuleType } from './constants';

type Ref = string;
export type ModuleRef = Ref;
export type ToolRef = Ref;

interface AvailableModuleData {
  name: string,
  ref: ModuleRef,
}

interface SelectedModuleData {
  ref: ModuleRef,
  tools: ToolData[],
}

export interface ToolData {
  name: string,
  ref: ToolRef,
}

export interface CyborgModuleRewriterData {
  availableModules: AvailableModuleData[],
  selectedModule?: SelectedModuleData,
}
export interface ModuleDefinition {
  id: ModuleType,
  name: string,
}

export type ModuleDefinitionLookup = {
  [key in ModuleType]?: ModuleDefinition;
}

interface ModuleActionPayload {
  moduleRef: ModuleRef,
}

interface ToolActionPayload extends ModuleActionPayload {
  toolRef: ToolRef,
}

export interface EjectModuleActionPayload extends ModuleActionPayload {}
export interface MoveToolActionPayload extends ToolActionPayload {
  dir: Direction,
}
export interface RemoveToolActionPayload extends ToolActionPayload {}
export interface ResetModuleActionPayload extends ModuleActionPayload {
  moduleId: ModuleType,
}
export interface SelectModuleActionPayload extends ModuleActionPayload {}

export type ActionType<PayloadType extends object = {}> = (
  act: Act,
  payload: PayloadType,
) => void;
