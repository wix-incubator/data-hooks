export type DataHookOptionValue = string | number | boolean | null | undefined;

export type DataHooks<T extends DataHookElements> = {
  [Elem in keyof T]: (options?: Partial<T[Elem]>) => string;
};

export type DataHookElements = {
  [element: string]: { [option: string]: DataHookOptionValue };
};

export function dataHooks<T extends DataHookElements>(componentName: string): DataHooks<T> {
  // @ts-expect-error we set handler on an empty object
  return new Proxy({}, handler<T>(componentName));
}

function handler<T extends DataHookElements>(componentName: string) {
  return {
    get<Elem extends keyof T>(obj: any, element: Elem) {
      return (options: Partial<T[Elem]>) => buildDataHook(componentName, element as string, options);
    },
  };
}

function buildDataHook(cmp: string, element: string, options: Record<string, DataHookOptionValue>) {
  const strOptions = buildOptions(options).map((optionWithValue) => `${element}--${optionWithValue}`);
  return [`${cmp}__${element}`, ...strOptions].join(' ');
}

function buildOptions<Options extends Record<string, DataHookOptionValue>>(options: Options): string[] {
  return Object.entries(options || {})
    .map(([key, value]) => {
      if (typeof value === 'boolean' || value === null || value === undefined) {
        return value ? key : '';
      }

      return `${key}_${value}`;
    })
    .filter(Boolean);
}
