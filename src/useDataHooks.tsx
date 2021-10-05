import { DataHooksGenerator, WithDataHooks } from './types';

export function useDataHooks<T extends DataHooksGenerator<any>>(dataHooks: T, baseDataHook?: string): WithDataHooks<T> {
  return {
    // @ts-expect-error
    dataHooks: new Proxy<T>(dataHooks, {
      get(target: T, elem: PropertyKey): any {
        if (elem === 'base') {
          return (options) => (baseDataHook ? `${baseDataHook} ` : '') + target.base(options);
        }
        // @ts-expect-error
        return target[elem];
      },
    }),
  };
}
