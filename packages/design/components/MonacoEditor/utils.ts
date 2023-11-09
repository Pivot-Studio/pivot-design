import { Module } from './types';

export const getLocalPrivateKey = (key: string) => `pivot_editor_${key}`;
export const getModulesEntry = (modules: Module[]) =>
  modules.find((module) => module.entry);

export const getInternalModule = (modules: Module[], moduleSource: string) => {
  return modules.find((module) => module.key === moduleSource);
};
