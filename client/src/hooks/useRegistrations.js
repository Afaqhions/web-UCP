import { useEffect, useState, useCallback } from 'react';
import { registrationService } from '../services/registrations';

export const useRegistrations = (page = 1) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await registrationService.getMyRegistrations(page);
      setRegistrations(data.registrations);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const registerForCompetition = useCallback(async (competitionId, data) => {
    try {
      const result = await registrationService.registerForCompetition(competitionId, data);
      setRegistrations((prev) => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const cancelRegistration = useCallback(async (registrationId) => {
    try {
      await registrationService.cancelRegistration(registrationId);
      setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    registrations,
    loading,
    error,
    total,
    registerForCompetition,
    cancelRegistration,
    refetch: fetchRegistrations,
  };
};
