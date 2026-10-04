/**
 * @file
 * @copyright 2021
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

export enum Action {
  EjectModule = 'ejectModule',
  ChangeInsertedModule = 'changeInsertedModule',
  MoveTool = 'tool-move',
  RemoveTool = 'tool-remove',
}

export enum Direction {
  Up = 'up',
  Down = 'down',
}

interface ItemActionPayload {
  itemRef: string;
}

export interface ToolActionPayload extends ItemActionPayload {}

export interface MoveToolActionPayload extends ToolActionPayload {
  dir: Direction;
}
