import type { ISocialLinks } from './socials';

// ----------------------------------------------------------------------

export type IAuthorProps = {
  name: string;
  avatarUrl: string;
  verified?: boolean;
  phoneNumber?: string;
  ratingNumber?: number;
  totalReviews?: number;
  socialLinks?: ISocialLinks;
};
