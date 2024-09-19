import type { IDateValue } from './common';
import type { IAuthorProps } from './author';
import type { ISocialLinks } from './socials';

// ----------------------------------------------------------------------

export type IProjectCategoryProps = {
  label: string;
  path: string;
};

export type IProjectProps = {
  id: string;
  duration: string;
  title: string;
  description: string;
  status: string;
  team: string;
  tags: string[];
  createdAt: IDateValue;
  coverUrl: string;
  content: string;
  github: string;
  youtube: string;
  author: IAuthorProps;
};
