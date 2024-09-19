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
  title: string;
  heroUrl: string;
  tags: string[];
  content: string;
  category: string;
  coverUrl: string;
  duration: string;
  favorited: boolean;
  description: string;
  author: IAuthorProps;
  createdAt: IDateValue;
  shareLinks?: ISocialLinks;
  team: string;
  github: string;
  youtube: string;
};
