import { Offer } from '../../../../types/offers';

type GalleryProps = {
  imageUrls: Offer['images'];
};

export function Gallery({ imageUrls }: GalleryProps) {
  return (
    <div className="offer__gallery">
      {imageUrls.map((imageUrl) => (
        <div className="offer__image-wrapper" key={imageUrl}>
          <img className="offer__image" src={imageUrl} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}
