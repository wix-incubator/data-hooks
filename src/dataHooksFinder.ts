import { UniDriver, UniDriverList } from '@unidriver/core';

import { byDataHook } from './byDataHook';
import { DataHookElements, DataHooks } from './dataHooks';

export declare type DataHooksFinder<T, DH extends DataHookElements> = {
  [Elem in keyof DH]: {
    find: (options?: Partial<DH[Elem]>) => UniDriver<T>;
    findAll: (options?: Partial<DH[Elem]>) => UniDriverList<T>;
  };
};

export function dataHooksFinder<T, DH extends DataHookElements>(
  base: UniDriver<T>,
  dataHooks: DataHooks<DH>,
): DataHooksFinder<T, DH> {
  // @ts-expect-error
  return new Proxy(dataHooks, {
    get(obj, element) {
      return {
        find: (options) => base.$(byDataHook(dataHooks[element as string](options))),
        findAll: (options) => base.$$(byDataHook(dataHooks[element as string](options))),
      };
    },
  });
}
