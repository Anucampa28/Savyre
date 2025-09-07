import { useState, useEffect } from 'react';
import { contentService, Page, ContentBlock, PageSection } from '../services/contentService';

/**
 * Hook to fetch and manage content from the content database
 */

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const pageData = await contentService.getPage(slug);
        setPage(pageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading, error };
}

export function useContentBlock(key: string) {
  const [contentBlock, setContentBlock] = useState<ContentBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentBlock = async () => {
      try {
        setLoading(true);
        setError(null);
        const block = await contentService.getContentBlock(key);
        setContentBlock(block);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content block');
      } finally {
        setLoading(false);
      }
    };

    fetchContentBlock();
  }, [key]);

  return { contentBlock, loading, error };
}

export function useContentBlocksByCategory(category: string) {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentBlocks = async () => {
      try {
        setLoading(true);
        setError(null);
        const blocks = await contentService.getContentBlocksByCategory(category);
        setContentBlocks(blocks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content blocks');
      } finally {
        setLoading(false);
      }
    };

    fetchContentBlocks();
  }, [category]);

  return { contentBlocks, loading, error };
}

export function usePageSections(pageId: number) {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        setError(null);
        const sectionsData = await contentService.getPageSections(pageId);
        setSections(sectionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page sections');
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchSections();
    }
  }, [pageId]);

  return { sections, loading, error };
}

export function usePageSection(pageId: number, sectionKey: string) {
  const [section, setSection] = useState<PageSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true);
        setError(null);
        const sectionData = await contentService.getPageSection(pageId, sectionKey);
        setSection(sectionData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page section');
      } finally {
        setLoading(false);
      }
    };

    if (pageId && sectionKey) {
      fetchSection();
    }
  }, [pageId, sectionKey]);

  return { section, loading, error };
}

/**
 * Hook to get content with fallback to static content
 */
export function useContentWithFallback<T>(
  contentKey: string,
  fallbackContent: T,
  fetchFn: (key: string) => Promise<T | null>
) {
  const [content, setContent] = useState<T>(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedContent = await fetchFn(contentKey);
        setContent(fetchedContent || fallbackContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
        setContent(fallbackContent); // Use fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentKey, fallbackContent, fetchFn]);

  return { content, loading, error };
}
