import { UniDriver, UniDriverList } from '@unidriver/core';

import { byDataHook } from './byDataHook';
import { DataHooks, DataHooksGenerator } from './types';

export declare type DataHooksFinder<T, DH extends DataHooks> = {
  [Elem in keyof DH]: {
    find: (options?: Partial<DH[Elem]>) => UniDriver<T>;
    findAll: (options?: Partial<DH[Elem]>) => UniDriverList<T>;
  };
};

export function dataHooksFinder<T, DH extends DataHooks>(
  base: UniDriver<T>,
  dataHooks: DataHooksGenerator<DH>,
): DataHooksFinder<T, DH> {
  // @ts-expect-error
  return new Proxy(dataHooks, {
    get(obj, element) {
      return {
        // @ts-expect-error
        find: (options) => base.$(byDataHook(dataHooks[element](options))),
        // @ts-expect-error
        findAll: (options) => base.$$(byDataHook(dataHooks[element](options))),
      };
    },
  });
}
