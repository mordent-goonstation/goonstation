/**
 * @file
 * @copyright 2021
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

export interface CyborgModuleRewriterData {
  insertedModule: ModuleData;
}

export interface ModuleData {
  itemRef: string;
  name: string;
  tools: ToolData[];
}

export interface ToolData {
  itemRef: string;
  name: string;
}
