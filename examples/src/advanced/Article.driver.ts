import { UniDriver } from '@unidriver/core';
import { createFinders } from 'data-hooks-unidriver';
import { articleDataHooks } from './Article.dataHooks';

export const ArticleDriver = <T>(base: UniDriver<T>) => {
  const { title, description, author } = createFinders(base, articleDataHooks);

  return {
    getTitle: () => title.find().text(),
    getDescription: () => description.find().text(),
    getAuthorsCount: () => author.findAll().count(),
    getAuthorName: (authorId: string) => author.find({ id: authorId }).text(),
  };
};
