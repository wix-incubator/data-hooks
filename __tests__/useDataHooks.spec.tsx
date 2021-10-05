import { dataHooks, useDataHooks } from '../src';

describe('useDataHooks hook', () => {
  const cmpDataHooks = dataHooks('cmp');

  it('should pass dataHook prop as dataHooks.base()', () => {
    const { dataHooks } = useDataHooks(cmpDataHooks, 'parent-data-hook');
    expect(dataHooks.base()).toEqual('parent-data-hook cmp__base');
  });

  it('should keep generator behavior', () => {
    const { dataHooks } = useDataHooks(cmpDataHooks, 'parent-data-hook');
    expect(dataHooks.elem({ key: 'value' })).toEqual('cmp__elem elem--key_value');
  });
});
