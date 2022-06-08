import React from "react";
import { CmpDataHooksGenerator, DataHookElementsFromDH } from './withDataHooks';
import { DataHooks } from '@wix/data-hooks';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useDataHooks<T extends DataHooks<any>>(dataHooks: T, baseDataHook?: string): CmpDataHooksGenerator<{ base: {} } & DataHookElementsFromDH<T>> {
  return React.useMemo(() => new Proxy<T>(dataHooks, {
    get(target: T, elem: PropertyKey): any {
      if (elem === 'base') {
        return (options) => (baseDataHook ? `${baseDataHook} ` : '') + target.base(options);
      }
      return target[elem as string];
    },
  }), [dataHooks, baseDataHook])
}
