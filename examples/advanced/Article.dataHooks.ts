import { dataHooks } from '../..';
// In your project:
// import { dataHooks } from '@wix/data-hooks';

export const articleDataHooks = dataHooks<{
  title;
  description;
  author: { id: string };
}>('article');

// dataHooks creates a JavaScript Proxy,
// so you do not need to pass the keys itself, just types are enough
