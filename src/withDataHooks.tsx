import React from 'react';
import { DataHooksGenerator, WithDataHooks } from './types';

export function withDataHooks<T extends DataHooksGenerator<any>>(dataHooks: T) {
  return <Props extends WithDataHooks<T>>(
    Cmp: React.ComponentType<Props>,
  ): React.FC<{ dataHook?: string } & Omit<Props, 'dataHooks'>> => (props) => (
    // @ts-expect-error
    <Cmp
      {...props}
      dataHooks={{
        ...dataHooks,
        root: (options: T['root']) => {
          return (
            (props.dataHook ? `${props.dataHook} ` : '') +
            dataHooks.root(options)
          );
        },
      }}
    />
  );
}
