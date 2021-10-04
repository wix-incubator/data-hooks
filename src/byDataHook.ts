export const byDataHook = (dataHooks: string): string =>
  dataHooks
    .split(' ')
    .filter(Boolean)
    .map((hook) => `[data-hook~="${hook}"]`)
    .join('');
