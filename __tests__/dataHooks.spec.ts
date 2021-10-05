import { dataHooks } from '../src';

describe('Data hooks creator', () => {
  it('should add true option values', () => {
    const hooks = dataHooks<{ elem: { active: boolean } }>('cmp');
    expect(hooks.elem({ active: true })).toEqual('cmp__elem elem--active');
  });

  it('should add string option values', () => {
    const hooks = dataHooks<{ elem: { slug: string } }>('cmp');
    expect(hooks.elem({ slug: 'bla' })).toEqual('cmp__elem elem--slug_bla');
  });

  it('should add number values', () => {
    const hooks = dataHooks<{ elem: { value: number } }>('cmp');
    expect(hooks.elem({ value: 14 })).toEqual('cmp__elem elem--value_14');
  });

  it('should not omit 0 number option values', () => {
    const hooks = dataHooks<{ elem: { id: number } }>('cmp');
    expect(hooks.elem({ id: 0 })).toEqual('cmp__elem elem--id_0');
  });

  it('should not omit empty string option values', () => {
    const hooks = dataHooks<{ elem: { slug: string } }>('cmp');
    expect(hooks.elem({ slug: '' })).toEqual('cmp__elem elem--slug_');
  });

  it('should not add options if not passed', () => {
    const hooks = dataHooks<{ elem: { slug: string } }>('cmp');
    expect(hooks.elem()).toEqual('cmp__elem');
  });

  describe('Negative values', () => {
    it('should omit null option values', () => {
      const hooks = dataHooks<{ elem: { active: null } }>('cmp');
      expect(hooks.elem({ active: null })).toEqual('cmp__elem');
    });

    it('should omit undefined option values', () => {
      const hooks = dataHooks<{ elem: { active: undefined } }>('cmp');
      expect(hooks.elem({ active: undefined })).toEqual('cmp__elem');
    });

    it('should omit false option values', () => {
      const hooks = dataHooks<{ elem: { active: boolean } }>('cmp');
      expect(hooks.elem({ active: false })).toEqual('cmp__elem');
    });
  });

  describe('types', () => {
    const hooks = dataHooks<{ elem: { one: string; two: string } }>('cmp');

    it('should allow to pass not all params', () => {
      hooks.elem({ one: 'value' });
      hooks.elem();
    });

    it('should not allow to pass not defined params', () => {
      // @ts-expect-error
      hooks.elem({ three: 'bla' });
      // @ts-expect-error
      hooks.elem({ one: 0 });
      // @ts-expect-error
      hooks.nonEsists({});
    });
  });
});
