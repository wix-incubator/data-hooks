import { UniDriver } from '@unidriver/core';
import { dataHooksFinder } from '@wix/data-hooks-unidriver';
import { articleDataHooks } from './Article.dataHooks';

export const ArticleDriver = <T>(base: UniDriver<T>) => {
  const { title, description, author } = dataHooksFinder(base, articleDataHooks);

  return {
    getTitle: () => title.find().text(),
    getDescription: () => description.find().text(),
    getAuthorsCount: () => author.findAll().count(),
    getAuthorName: (authorId: string) => author.find({ id: authorId }).text(),
  };
};
