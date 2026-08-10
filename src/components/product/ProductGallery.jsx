import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export function ProductGallery({ product }) {
  const images = useMemo(
    () => (product.images?.length ? product.images : [product.thumbnail]),
    [product.images, product.thumbnail],
  );
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setActiveImage(images[0]);
    setIsZoomed(false);
  }, [images]);

  return (
    <div className="space-y-4">
      <button
        aria-label={isZoomed ? 'Disable image zoom' : 'Enable image zoom'}
        className="group relative aspect-square w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-offset-secondary"
        type="button"
        onClick={() => setIsZoomed((current) => !current)}
      >
        <img
          alt={product.title}
          decoding="async"
          className={
            isZoomed
              ? 'h-full w-full scale-125 object-contain transition duration-300'
              : 'h-full w-full object-contain transition duration-300 group-hover:scale-105'
          }
          src={activeImage}
        />
        <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/90 text-white">
          <Search aria-hidden="true" className="h-4 w-4" />
        </span>
      </button>

      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((image, index) => (
          <button
            aria-label={`View ${product.title} image ${index + 1}`}
            className={
              activeImage === image
                ? 'aspect-square rounded-2xl border-2 border-primary bg-white p-2 dark:bg-slate-900'
                : 'aspect-square rounded-2xl border border-slate-200 bg-white p-2 transition hover:border-primary dark:border-slate-800 dark:bg-slate-900'
            }
            key={image}
            type="button"
            onClick={() => {
              setActiveImage(image);
              setIsZoomed(false);
            }}
          >
            <img
              alt=""
              className="h-full w-full object-contain"
              decoding="async"
              loading="lazy"
              src={image}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
