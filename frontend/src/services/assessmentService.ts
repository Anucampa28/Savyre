/**
 * Assessment Service - Fetches assessment data from the API
 */

export interface Assessment {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration_minutes: number;
  assessment_type?: string;
  created_at: string;
  updated_at?: string;
  github_repo_url?: string;
  pr_number?: number;
  review_guidelines?: string;
  evaluation_criteria?: string;
}

export interface AssessmentStats {
  total: number;
  completed: number;
  in_progress: number;
  pending: number;
}

class AssessmentService {
  private baseUrl = 'http://localhost:8000/api/assessments';

  /**
   * Fetch all assessments
   */
  async getAssessments(): Promise<Assessment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch assessments: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching assessments:', error);
      return [];
    }
  }

  /**
   * Fetch a specific assessment by ID
   */
  async getAssessment(id: number): Promise<Assessment | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch assessment: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching assessment:', error);
      return null;
    }
  }

  /**
   * Calculate assessment statistics
   */
  calculateStats(assessments: Assessment[]): AssessmentStats {
    return {
      total: assessments.length,
      completed: 0, // This would need to be calculated based on user submissions
      in_progress: 0, // This would need to be calculated based on user progress
      pending: assessments.length // For now, assume all are pending
    };
  }

  /**
   * Filter assessments by search term
   */
  filterAssessments(assessments: Assessment[], searchTerm: string): Assessment[] {
    if (!searchTerm.trim()) {
      return assessments;
    }
    
    const term = searchTerm.toLowerCase();
    return assessments.filter(assessment =>
      assessment.title.toLowerCase().includes(term) ||
      assessment.description.toLowerCase().includes(term) ||
      assessment.difficulty.toLowerCase().includes(term)
    );
  }
}

// Export a singleton instance
export const assessmentService = new AssessmentService();
export default assessmentService;
