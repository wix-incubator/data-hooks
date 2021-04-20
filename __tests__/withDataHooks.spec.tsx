import { dataHooks, withDataHooks } from '../src';
import React from 'react';
import { render } from '@testing-library/react';
import { WithDataHooks } from '../src/types';

describe('Data hooks HOC', () => {
  const cmpDataHooks = dataHooks('cmp');
  const Cmp = jest.fn(
    (() => null) as React.FC<WithDataHooks<typeof cmpDataHooks>>,
  );
  const WrappedCmp = withDataHooks(cmpDataHooks)(Cmp);

  beforeEach(() => Cmp.mockClear());

  it('should call passed Cmp', () => {
    render(<WrappedCmp />);
    expect(Cmp).toBeCalled();
  });

  it('should pass all props as it is', () => {
    const props = { a: 'string', b: { key: 'object-value' }, fn: () => {} };

    Cmp.mockImplementation(({ dataHooks, ...restProps }) => {
      expect(restProps).toEqual(props);
      return null;
    });
    // @ts-expect-error
    render(<WrappedCmp {...props} />);
    expect(Cmp).toBeCalled();
  });

  it('should pass dataHook prop as dataHooks.root()', () => {
    Cmp.mockImplementation((props) => {
      expect(props.dataHooks.root()).toEqual('parent-data-hook cmp__root');
      return null;
    });
    render(<WrappedCmp dataHook="parent-data-hook" />);
    expect(Cmp).toBeCalled();
  });

  it('should keep generator behavior', () => {
    Cmp.mockImplementation((props) => {
      expect(props.dataHooks.elem({ key: 'value' })).toEqual(
        'cmp__elem elem--key_value',
      );
      return null;
    });
    render(<WrappedCmp />);
    expect(Cmp).toBeCalled();
  });
});
