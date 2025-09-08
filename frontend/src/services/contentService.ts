/**
 * Content Service - Fetches static content from the content database
 */

export interface ContentBlock {
  id: number;
  key: string;
  title: string;
  content: string;
  content_type: string;
  category: string;
  language: string;
  is_active: boolean;
  meta_data?: any;
  created_at: string;
  updated_at: string;
}

export interface PageSection {
  id: number;
  section_key: string;
  title: string;
  content: string;
  content_type: string;
  order: number;
  is_active: boolean;
  meta_data?: any;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  page_type: string;
  language: string;
  is_published: boolean;
  seo_title?: string;
  seo_description?: string;
  meta_data?: any;
  created_at: string;
  updated_at: string;
  sections?: PageSection[];
}

class ContentService {
  private baseUrl = 'http://localhost:8000/api/content';

  /**
   * Fetch a page by slug with its sections
   */
  async getPage(slug: string): Promise<Page | null> {
    try {
      const response = await fetch(`${this.baseUrl}/pages/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  /**
   * Fetch all pages
   */
  async getPages(): Promise<Page[]> {
    try {
      const response = await fetch(`${this.baseUrl}/pages`);
      if (!response.ok) {
        throw new Error(`Failed to fetch pages: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  /**
   * Fetch a content block by key
   */
  async getContentBlock(key: string): Promise<ContentBlock | null> {
    try {
      const response = await fetch(`${this.baseUrl}/content/${key}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch content block: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching content block:', error);
      return null;
    }
  }

  /**
   * Fetch multiple content blocks by category
   */
  async getContentBlocksByCategory(category: string): Promise<ContentBlock[]> {
    try {
      const response = await fetch(`${this.baseUrl}/content?category=${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch content blocks: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching content blocks:', error);
      return [];
    }
  }

  /**
   * Fetch all content blocks
   */
  async getAllContentBlocks(): Promise<ContentBlock[]> {
    try {
      const response = await fetch(`${this.baseUrl}/content`);
      if (!response.ok) {
        throw new Error(`Failed to fetch content blocks: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching content blocks:', error);
      return [];
    }
  }

  /**
   * Get page sections by page ID
   */
  async getPageSections(pageId: number): Promise<PageSection[]> {
    try {
      const response = await fetch(`${this.baseUrl}/pages/${pageId}/sections`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page sections: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching page sections:', error);
      return [];
    }
  }

  /**
   * Get a specific section by page ID and section key
   */
  async getPageSection(pageId: number, sectionKey: string): Promise<PageSection | null> {
    try {
      const response = await fetch(`${this.baseUrl}/pages/${pageId}/sections/${sectionKey}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch page section: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching page section:', error);
      return null;
    }
  }
}

// Export a singleton instance
export const contentService = new ContentService();
export default contentService;
