import { dataHooks, withDataHooks } from '../src';

describe('Types', () => {
  const hooks = dataHooks<{ elem: { one: string; two: string } }>('cmp');

  describe('data hooks generator', () => {
    it('should allow to pass not all params', () => {
      hooks.elem({ one: 'value' });
      hooks.elem();
    });
  });

  describe('data hooks high ordered component', () => {
    it('should force to pass all params', () => {
      withDataHooks(hooks)(({ dataHooks }) => {
        dataHooks.elem({ one: 'value', two: 'value' });

        // @ts-expect-error
        dataHooks.elem({ one: 'value' });

        // @ts-expect-error
        dataHooks.elem({});

        // @ts-expect-error
        dataHooks.elem();
        return null;
      });
    });

    it('should not require any params for root', () => {
      withDataHooks(hooks)(({ dataHooks }) => {
        dataHooks.root();
        return null;
      });
    });

    it('should require params for root if such exists in data hooks', () => {
      const hooksWithRoot = dataHooks<{ root: { key: string } }>('cmp');
      withDataHooks(hooksWithRoot)(({ dataHooks }) => {
        dataHooks.root({ key: 'value' });

        // @ts-expect-error
        dataHooks.root({});

        // @ts-expect-error
        dataHooks.root();
        return null;
      });
    });
  });
});
