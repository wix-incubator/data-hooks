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

    it('should not require any params for base', () => {
      withDataHooks(hooks)(({ dataHooks }) => {
        dataHooks.base();
        return null;
      });
    });

    // it('should not require any params if no options', () => {
    //   const hooksWithBase = dataHooks<{ elem }>('cmp');
    //   withDataHooks(hooksWithBase)(({ dataHooks }) => {
    //     dataHooks.elem();
    //     return null;
    //   });
    // });

    it('should require params for base if such exists in data hooks', () => {
      const hooksWithBase = dataHooks<{ base: { key: string } }>('cmp');
      withDataHooks(hooksWithBase)(({ dataHooks }) => {
        dataHooks.base({ key: 'value' });

        // @ts-expect-error
        dataHooks.base({});

        // @ts-expect-error
        dataHooks.base();
        return null;
      });
    });
  });
});
