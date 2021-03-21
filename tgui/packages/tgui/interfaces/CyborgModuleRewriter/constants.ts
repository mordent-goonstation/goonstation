import { ModuleDefinition, ModuleDefinitionLookup } from './types';

export enum Action {
  EjectModule = 'module-eject',
  MoveTool = 'tool-move',
  RemoveTool = 'tool-remove',
  ResetModule = 'module-reset',
  SelectModule = 'module-select',
}

export enum Direction {
  Down = 'down',
  Up = 'up',
}

export enum ModuleType {
  Brobocop = 'brobocop',
  Chemistry = 'chemistry',
  Civilian = 'civilian',
  Engineering = 'engineering',
  Medical = 'medical',
  Mining = 'mining',
}

export const moduleDefinitions: ModuleDefinition[] = [
  {
    id: ModuleType.Brobocop,
    name: 'Brobocop',
  },
  {
    id: ModuleType.Chemistry,
    name: 'Chemistry',
  },
  {
    id: ModuleType.Civilian,
    name: 'Civilian',
  },
  {
    id: ModuleType.Engineering,
    name: 'Engineering',
  },
  {
    id: ModuleType.Medical,
    name: 'Medical',
  },
  {
    id: ModuleType.Mining,
    name: 'Mining',
  },
];

export const moduleDefinitionLookup: ModuleDefinitionLookup = (
  moduleDefinitions.reduce((acc, curr) => ({
    ...acc,
    [curr.id]: curr,
  }), {})
);
