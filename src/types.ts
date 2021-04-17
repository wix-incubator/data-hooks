export type DataHookValue = boolean | number | string | null | undefined;

export type DataHooks = {
  [dataHook: string]: { [key: string]: DataHookValue };
};

export type DataHooksGenerator<T extends DataHooks> = {
  [Elem in keyof T]: (options?: Partial<T[Elem]>) => string;
};

type CmpDataHooksGenerator<T extends DataHooksGenerator<any>> = {
  [Elem in keyof T]: (options: Required<Parameters<T[Elem]>[0]>) => string;
};

export type WithDataHooks<T extends DataHooksGenerator<any>> = {
  dataHooks: T extends { root: any }
    ? CmpDataHooksGenerator<T>
    : CmpDataHooksGenerator<T> & { root: () => string };
};
