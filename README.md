# Typed Data Hooks Generator

A strict typed data hooks generator for your React components.

Use the generator to share your dataHooks between components, drivers and tests

## Install

```bash
npm install @wix/data-hooks --save-dev

# If you need `withDataHooks()` HOC or `useDataHooks()` React Hooks
npm install @wix/data-hooks-react --save-dev

# If you need UniDriver finders
npm install @wix/data-hooks-unidriver --save-dev
```

## What is inside

### `@wix/data-hooks`
* `dataHooks()` — creates data-hooks generator. [Examples](./packages/data-hooks/__tests__/dataHooks.spec.ts)
* `byDataHook()` — build CSS selector to find element by `data-hook` html attribute. [Examples](./packages/data-hooks/__tests__/byDataHook.spec.ts)

### `@wix/data-hooks-react`
* `withDataHooks()` – React HOC to wrap your component to pass `dataHooks` with `base` element generator as a prop. [Examples](./packages/data-hooks-react/__tests__/withDataHooks.spec.tsx)
* `useDataHooks()` – React hook to get `dataHooks` generator. [Examples](./packages/data-hooks-react/__tests__/useDataHooks.spec.ts)

### `@wix/data-hooks-unidriver`
* `createFinders()` – creates `find()` and `findAll()` methods to find [UniDriver](https://github.com/wix-incubator/unidriver) elements by `data-hook` attribute.

## Basic Usage (without HOC or React Hooks)

> See the example source code [here](./examples/src/basic)

> Checkout [advanced example](./examples/src/advanced) to see `dataHooks()`, `withDataHooks()` and `createFinders()` usages

```typescript
// Article.dataHooks.ts
import { dataHooks } from "@wix/data-hooks";

const articleDataHooks = dataHooks<{
  title;
  description;
  author: { id: string }
}>('article');

// dataHooks creates a JavaScript Proxy,
// so you do not need to pass the keys, types are enought
```

```typescript jsx
// Article.tsx
import { articleDataHooks } from "./Article.dataHooks.ts";

const Article: React.FC = ({dataHook, title, description, authorsList}) => (
  <article data-hook={dataHook}>
    <h1 data-hook={articleDataHooks.title()}>{title}</h1> {/* data-hook="article__title */}
    <p data-hook={articleDataHooks.description()}>{description}</p> {/* data-hook="article__description */}
    <ul>
      {authorsList.map(author => (
        <li
          key={author.id}
          data-hook={articleDataHooks.author({id: author.id})}
          {/* data-hook="article__author author--id_${author.id} */}
        >
          {author.name}
        </li>
      ))}
    </ul>
  </article>
)
```

```typescript jsx
// Article.spec.ts
import { render } from '@testing-library/react';
import { Article } from './Article.tsx';
import { articleDataHooks } from "./Article.dataHooks.ts";

describe('<Article/>', () => {
  it('should render all authors', () => {
    const result = render(
      <Article
        title={"How to use data-hooks"}
        description={"A simple generator to share your data-hooks"}
        authorsList={[
          {name: 'John Simber', id: 'f19a3'},
          {name: 'Nick Figurt', id: '4ea2c'},
        ]}
      />
    )
    const selector = `[data-hook~="${articleDataHooks.author()}"]`;
    expect(result.baseElement.querySelectorAll(selector)).toHaveLength(2);
  })
})
```




