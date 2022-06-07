import { WithDataHooks } from './withDataHooks';
import { DataHooks } from './dataHooks';

export function useDataHooks<T extends DataHooks<any>>(dataHooks: T, baseDataHook?: string): WithDataHooks<T> {
  return {
    dataHooks: new Proxy<T>(dataHooks, {
      get(target: T, elem: PropertyKey): any {
        if (elem === 'base') {
          return (options) => (baseDataHook ? `${baseDataHook} ` : '') + target.base(options);
        }
        return target[elem as string];
      },
    }),
  };
}
