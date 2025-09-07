import { useState, useEffect, useCallback } from 'react';
import { assessmentService, Assessment, AssessmentStats } from '../services/assessmentService';

/**
 * Hook to fetch and manage assessments data
 */

export function useAssessments() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assessmentService.getAssessments();
      setAssessments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assessments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  const stats: AssessmentStats = assessmentService.calculateStats(assessments);

  return {
    assessments,
    loading,
    error,
    stats,
    refetch: fetchAssessments
  };
}

export function useAssessment(id: number) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assessmentService.getAssessment(id);
      setAssessment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assessment');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAssessment();
    }
  }, [id, fetchAssessment]);

  return {
    assessment,
    loading,
    error,
    refetch: fetchAssessment
  };
}

export function useAssessmentSearch(assessments: Assessment[], searchTerm: string) {
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const filtered = assessmentService.filterAssessments(assessments, searchTerm);
    setFilteredAssessments(filtered);
  }, [assessments, searchTerm]);

  return filteredAssessments;
}
