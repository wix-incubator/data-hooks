import { UniDriver, UniDriverList } from '@unidriver/core';
import { byDataHook, DataHookElements, DataHooks } from '@wix/data-hooks';

export declare type DataHooksFinder<T, DH extends DataHookElements> = {
  [Elem in keyof DH]: {
    find: (options?: Partial<DH[Elem]>) => UniDriver<T>;
    findAll: (options?: Partial<DH[Elem]>) => UniDriverList<T>;
  };
};

export function createFinders<T, DH extends DataHookElements>(
  base: UniDriver<T>,
  dataHooks: DataHooks<DH>,
): DataHooksFinder<T, DH> {
  // @ts-expect-error we set handler on an empty object
  return new Proxy(dataHooks, {
    get(obj, element) {
      return {
        find: (options) => base.$(byDataHook(dataHooks[element as string](options))),
        findAll: (options) => base.$$(byDataHook(dataHooks[element as string](options))),
      };
    },
  });
}
