import { DataHooksGenerator, WithDataHooks } from './types';

export function useDataHooks<T extends DataHooksGenerator<any>>(
  dataHooks: T,
  rootDataHook?: string,
): WithDataHooks<T> {
  return {
    // @ts-expect-error
    dataHooks: new Proxy<T>(dataHooks, {
      get(target: T, elem: PropertyKey): any {
        if (elem === 'root') {
          return (options) =>
            (rootDataHook ? `${rootDataHook} ` : '') + target.root(options);
        }
        // @ts-expect-error
        return target[elem];
      },
    }),
  };
}
