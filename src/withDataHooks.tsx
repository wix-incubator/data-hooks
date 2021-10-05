import React from 'react';
import { useDataHooks } from './useDataHooks';
import { DataHooks } from './dataHooks';

type CmpDataHooksGenerator<T extends DataHooks<any>> = {
  [Elem in keyof T]: (options: Required<Parameters<T[Elem]>[0]>) => string;
};

export type WithDataHooks<T extends DataHooks<any>> = {
  dataHooks: T extends { base: any } ? CmpDataHooksGenerator<T> : CmpDataHooksGenerator<T> & { base: () => string };
};

export function withDataHooks<T extends DataHooks<any>>(dataHooks: T) {
  return <Props extends WithDataHooks<T>>(
    Cmp: React.ComponentType<Props>,
  ): React.FC<{ dataHook?: string } & Omit<Props, 'dataHooks'>> => (props) => (
    <Cmp {...props} {...useDataHooks(dataHooks, props.dataHook)} />
  );
}
