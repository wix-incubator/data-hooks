import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Article } from './Article';
import { articleDataHooks } from './Article.dataHooks';
import { byDataHook } from '../../src';

describe('<Article/>', () => {
  it('should render title', () => {
    const { baseElement } = render(
      <Article
        title="How to use data-hooks"
        description="A simple generator to share your data-hooks"
        authorsList={[]}
      />,
    );

    const titleSelector = byDataHook(articleDataHooks.title());
    // `[data-hook~="${articleDataHooks.title()}"]`;

    expect(baseElement.querySelector(titleSelector)?.textContent).toEqual('How to use data-hooks');
  });

  describe('authors list', () => {
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <Article
          title="How to use data-hooks"
          description="A simple generator to share your data-hooks"
          authorsList={[
            { id: 'f19a3', name: 'John Simber' },
            { id: '4ea2c', name: 'Nick Figurt' },
          ]}
        />,
      );
    });

    it('should render all authors', () => {
      const selector = byDataHook(articleDataHooks.author());
      const { baseElement } = result;
      expect(baseElement.querySelectorAll(selector)).toHaveLength(2);
    });

    it('should render author names', () => {
      const firstAuthorSelector = byDataHook(articleDataHooks.author({ id: 'f19a3' }));
      const secondAuthorSelector = byDataHook(articleDataHooks.author({ id: '4ea2c' }));

      const { baseElement } = result;
      expect(baseElement.querySelector(firstAuthorSelector)?.textContent).toEqual('John Simber');
      expect(baseElement.querySelector(secondAuthorSelector)?.textContent).toEqual('Nick Figurt');
    });
  });
});
