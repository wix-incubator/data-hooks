import React from 'react';
import { render } from '@testing-library/react';
import { jsdomReactUniDriver } from '@unidriver/jsdom-react';
import { Article } from './Article';
import { ArticleDriver } from './Article.driver';

describe('<Article/>', () => {
  it('should render title', async () => {
    const { baseElement } = render(
      <Article
        title="How to use data-hooks"
        description="A simple generator to share your data-hooks"
        authorsList={[]}
      />,
    );
    const driver = ArticleDriver(jsdomReactUniDriver(baseElement));

    expect(await driver.getTitle()).toEqual('How to use data-hooks');
  });

  describe('authors list', () => {
    let driver: ReturnType<typeof ArticleDriver>;

    beforeEach(() => {
      const { baseElement } = render(
        <Article
          title="How to use data-hooks"
          description="A simple generator to share your data-hooks"
          authorsList={[
            { id: 'f19a3', name: 'John Simber' },
            { id: '4ea2c', name: 'Nick Figurt' },
          ]}
        />,
      );
      driver = ArticleDriver(jsdomReactUniDriver(baseElement));
    });

    it('should render all authors', async () => {
      expect(await driver.getAuthorsCount()).toEqual(2);
    });

    it('should render author names', async () => {
      expect(await driver.getAuthorName('f19a3')).toEqual('John Simber');
      expect(await driver.getAuthorName('4ea2c')).toEqual('Nick Figurt');
    });
  });
});
