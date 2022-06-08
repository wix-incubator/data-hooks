import { renderHook } from '@testing-library/react-hooks';
import { dataHooks } from 'data-hooks';
import { useDataHooks } from '../src';


describe('useDataHooks hook', () => {
  const cmpDataHooks = dataHooks<{ elem: { key: string } }>('cmp');

  it('should pass dataHook prop as dataHooks.base()', () => {
    const {result} = renderHook(() => useDataHooks(cmpDataHooks, 'parent-data-hook'));
    const dataHooks = result.current;
    expect(dataHooks.base()).toEqual('parent-data-hook cmp__base');
  });

  it('should keep generator behavior', () => {
    const {result} = renderHook(() => useDataHooks(cmpDataHooks, 'parent-data-hook'));
    const dataHooks = result.current;
    expect(dataHooks.elem({key: 'value'})).toEqual('cmp__elem elem--key_value');
  });
});
