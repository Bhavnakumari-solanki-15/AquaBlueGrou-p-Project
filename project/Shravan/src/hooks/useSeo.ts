import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

export const useMetaDescription = (description: string) => {
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    let originalDescription = '';

    if (metaDescription) {
      originalDescription = metaDescription.getAttribute('content') || '';
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    return () => {
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, [description]);
}; 