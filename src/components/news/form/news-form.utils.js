import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  headline: Yup.string().min(10).max(50).required('Required'),
  article: Yup.string().min(50).max(2000).required('Required'),
  bodyImage: Yup.string().required('Required'),
  heroImage: Yup.string().required('Required')
};

export const FIELDS_MAP_LEFT = [
  {
    type: 'image',
    id: 'heroImage',
    label: 'Hero image',
    placeholder: 'News hero image'
  },
  {
    type: 'image',
    id: 'bodyImage',
    label: 'Body image',
    placeholder: 'News image'
  }
];

export const FIELDS_MAP_RIGHT = [
  { type: 'text', id: 'headline', label: 'Headline' },
  { type: 'textarea', id: 'article', label: 'Article' }
];

export const initValues = newsArticle => {
  return {
    headline: newsArticle ? newsArticle.headline : '',
    article: newsArticle ? newsArticle.article : '',
    heroImage: newsArticle ? newsArticle.heroImage : '',
    bodyImage: newsArticle ? newsArticle.bodyImage : ''
  };
};
