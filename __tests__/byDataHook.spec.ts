import { byDataHook } from '../src';

describe('byDataHook', () => {
  it('one data-hook', () => {
    const result = byDataHook('element');
    const expected = '[data-hook~="element"]';
    expect(result).toEqual(expected);
  });
  it('a few data-hooks', () => {
    const result = byDataHook('element another-element');
    const expected = '[data-hook~="element"][data-hook~="another-element"]';
    expect(result).toEqual(expected);
  });
});
