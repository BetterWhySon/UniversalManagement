import { useEffect, useRef } from 'react';

export default function useDocumentTitle(title: string) {
  const documentDefined = typeof document !== 'undefined';
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current || 'Hanwha';
    };
  }, []);
}
