import { useEffect, useState, useCallback } from 'react';
import { competitionService } from '../services/competitions';

export const useCompetitions = (filters = {}, page = 1) => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchCompetitions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await competitionService.getCompetitions(filters, page);
      setCompetitions(data.competitions);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  return { competitions, loading, error, total, refetch: fetchCompetitions };
};

export const useCompetitionDetail = (id) => {
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      setLoading(true);
      try {
        const data = await competitionService.getCompetitionById(id);
        setCompetition(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCompetition();
  }, [id]);

  return { competition, loading, error };
};

export const useTrendingCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await competitionService.getTrendingCompetitions();
        setCompetitions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { competitions, loading, error };
};
