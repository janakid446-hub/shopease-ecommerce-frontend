import { Copy, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProductShare({ product }) {
  async function copyProductLink() {
    const productUrl = window.location.href;

    try {
      await window.navigator.clipboard.writeText(productUrl);
      toast.success('Product link copied');
    } catch {
      toast.error('Could not copy link');
    }
  }

  async function shareProduct() {
    const productUrl = window.location.href;

    if (window.navigator.share) {
      try {
        await window.navigator.share({
          text: product.description,
          title: product.title,
          url: productUrl,
        });
        return;
      } catch {
        return;
      }
    }

    copyProductLink();
  }

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-secondary shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-offset-secondary"
        type="button"
        onClick={shareProduct}
      >
        <Share2 aria-hidden="true" className="h-4 w-4" />
        Share
      </button>
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-secondary shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-offset-secondary"
        type="button"
        onClick={copyProductLink}
      >
        <Copy aria-hidden="true" className="h-4 w-4" />
        Copy link
      </button>
    </div>
  );
}
