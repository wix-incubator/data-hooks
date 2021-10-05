import { dataHooks, useDataHooks } from '../src';

describe('useDataHooks hook', () => {
  const cmpDataHooks = dataHooks('cmp');

  it('should pass dataHook prop as dataHooks.root()', () => {
    const { dataHooks } = useDataHooks(cmpDataHooks, 'parent-data-hook');
    expect(dataHooks.root()).toEqual('parent-data-hook cmp__root');
  });

  it('should keep generator behavior', () => {
    const { dataHooks } = useDataHooks(cmpDataHooks, 'parent-data-hook');
    expect(dataHooks.elem({ key: 'value' })).toEqual('cmp__elem elem--key_value');
  });
});
