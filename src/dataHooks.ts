import { DataHooks, DataHooksGenerator, DataHookValue } from './types';

function handler<T extends DataHooks>(componentName: string) {
  return {
    get<Elem extends keyof T>(obj: any, element: Elem) {
      return (options: Partial<T[Elem]>) =>
        [
          componentName + '__' + element,
          ...getStrOptions(options).map(
            (strOption) => `${element}--${strOption}`,
          ),
        ].join(' ');
    },
  };
}

export function dataHooks<T extends DataHooks>(
  componentName: string,
): DataHooksGenerator<T> {
  return new Proxy({}, handler<T>(componentName));
}

function getStrOptions<Options extends { [key: string]: DataHookValue }>(
  options: Options,
): string[] {
  return Object.entries(options || {})
    .map(([key, value]) => {
      if (typeof value === 'boolean' || value === null || value === undefined) {
        return value ? key : '';
      }

      return `${key}_${value}`;
    })
    .filter(Boolean);
}
