import React from 'react';
import { DataHooksGenerator, WithDataHooks } from './types';
import { useDataHooks } from './useDataHooks';

export function withDataHooks<T extends DataHooksGenerator<any>>(dataHooks: T) {
  return <Props extends WithDataHooks<T>>(
    Cmp: React.ComponentType<Props>,
  ): React.FC<{ dataHook?: string } & Omit<Props, 'dataHooks'>> => (props) => (
    // @ts-expect-error
    <Cmp {...props} {...useDataHooks(dataHooks, props.dataHook)} />
  );
}
