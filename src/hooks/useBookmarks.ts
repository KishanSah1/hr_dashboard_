'use client';

import { useHRContext } from '@/contexts/hr-context';
import { useCallback } from 'react';

export function useBookmarks() {
  const { state, dispatch } = useHRContext();

  const addBookmark = useCallback((employeeId: string) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: employeeId });
  }, [dispatch]);

  const removeBookmark = useCallback((employeeId: string) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: employeeId });
  }, [dispatch]);

  const toggleBookmark = useCallback((employeeId: string) => {
    if (state.bookmarks.includes(employeeId)) {
      removeBookmark(employeeId);
    } else {
      addBookmark(employeeId);
    }
  }, [state.bookmarks, addBookmark, removeBookmark]);

  const isBookmarked = useCallback((employeeId: string) => {
    return state.bookmarks.includes(employeeId);
  }, [state.bookmarks]);

  const bookmarkedEmployees = state.employees.filter(emp => 
    state.bookmarks.includes(emp.id)
  );

  return {
    bookmarks: state.bookmarks,
    bookmarkedEmployees,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
  };
}