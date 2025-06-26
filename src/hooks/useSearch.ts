'use client';

import { useHRContext } from '@/contexts/hr-context';
import { Employee } from '@/types/employee';
import { useMemo } from 'react';

export function useSearch() {
  const { state, dispatch } = useHRContext();

  const filteredEmployees = useMemo(() => {
    let filtered = state.employees;

    // Search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query)
      );
    }

    // Department filter
    if (state.selectedDepartments.length > 0) {
      filtered = filtered.filter(employee =>
        state.selectedDepartments.includes(employee.department)
      );
    }

    // Rating filter
    if (state.selectedRatings.length > 0) {
      filtered = filtered.filter(employee =>
        state.selectedRatings.includes(employee.rating)
      );
    }

    return filtered;
  }, [state.employees, state.searchQuery, state.selectedDepartments, state.selectedRatings]);

  const paginatedEmployees = useMemo(() => {
    const itemsPerPage = 12;
    const startIndex = (state.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, state.currentPage]);

  const totalPages = Math.ceil(filteredEmployees.length / 12);

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedDepartments = (departments: string[]) => {
    dispatch({ type: 'SET_SELECTED_DEPARTMENTS', payload: departments });
  };

  const setSelectedRatings = (ratings: number[]) => {
    dispatch({ type: 'SET_SELECTED_RATINGS', payload: ratings });
  };

  const setCurrentPage = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  return {
    searchQuery: state.searchQuery,
    selectedDepartments: state.selectedDepartments,
    selectedRatings: state.selectedRatings,
    currentPage: state.currentPage,
    totalPages,
    filteredEmployees,
    paginatedEmployees,
    setSearchQuery,
    setSelectedDepartments,
    setSelectedRatings,
    setCurrentPage,
  };
}