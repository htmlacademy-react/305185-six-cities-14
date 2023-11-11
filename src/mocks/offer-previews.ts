import { OfferPreview } from '../types/offers';
import { getOfferPreviews } from './helpers';
import { offers } from './offers';

const previewImageFolderUrl = 'https://14.design.pages.academy/static/hotel';

export const offerPreviews: OfferPreview[] = getOfferPreviews(offers, previewImageFolderUrl);
