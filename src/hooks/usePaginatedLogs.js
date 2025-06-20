import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchLogs } from '../services/fetchLogs';
import toast from 'react-hot-toast';

export const usePaginatedLogs = () => {
  const [logs, setLogs] = useState([]);
  const [roleFilter, setRoleFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        const logsData = await fetchLogs();
        setLogs(logsData);
      } catch (error) {
        toast.error("Failed to load logs.");
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  useEffect(() => setPage(1), [roleFilter]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => roleFilter === 'All' || log.role === roleFilter);
  }, [logs, roleFilter]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      logs: filteredLogs.slice(start, end),
      totalPages: Math.ceil(filteredLogs.length / pageSize),
      total: filteredLogs.length
    };
  }, [filteredLogs, page]);

  const filterOptions = useMemo(() => {
    const roles = [...new Set(logs.map(log => log.role))];
    return { roles };
  }, [logs]);

  const goToNextPage = useCallback(() => {
    setPage(prev => Math.min(prev + 1, paginatedData.totalPages));
  }, [paginatedData.totalPages]);

  const goToPrevPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleRoleFilterChange = useCallback((e) => {
    setRoleFilter(e.target.value);
  }, []);

  return {
    paginatedData,
    filterOptions,
    roleFilter,
    handleRoleFilterChange,
    goToNextPage,
    goToPrevPage,
    page,
    totalPages: paginatedData.totalPages,
    loading
  };
};
