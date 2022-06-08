import React from 'react';
import { useDataHooks } from 'data-hooks-react';
import { articleDataHooks } from './Article.dataHooks';

type ArticleProps = {
  dataHook?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  authorsList: { id: string; name: string }[];
};

export const Article: React.FC<ArticleProps> = ({ dataHook, title, description, authorsList }) => {
  const dataHooks = useDataHooks(articleDataHooks, dataHook);

  return (
    <article data-hook={dataHooks.base()}>
      <h1 data-hook={dataHooks.title()}>{title}</h1> {/* data-hook="article__title */}
      <p data-hook={dataHooks.description()}>{description}</p> {/* data-hook="article__description */}
      <ul>
        {authorsList.map((author) => (
          <li
            key={author.id}
            data-hook={dataHooks.author({ id: author.id })}
            // data-hook="article__author author--id_${author.id}
          >
            {author.name}
          </li>
        ))}
      </ul>
    </article>
  );
};
