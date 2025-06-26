'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchEmployees } from '../lib/api';
import { Department, Employee } from '../types/employee';

interface HRState {
  employees: Employee[];
  bookmarks: string[];
  departments: Department[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedDepartments: string[];
  selectedRatings: number[];
  currentPage: number;
  totalPages: number;
}

type HRAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_EMPLOYEES'; payload: Employee[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_BOOKMARK'; payload: string }
  | { type: 'REMOVE_BOOKMARK'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_DEPARTMENTS'; payload: string[] }
  | { type: 'SET_SELECTED_RATINGS'; payload: number[] }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
  | { type: 'ADD_EMPLOYEE'; payload: Employee };

const initialState: HRState = {
  employees: [],
  bookmarks: [],
  departments: [
    { id: 'engineering', name: 'Engineering', color: '#3B82F6' },
    { id: 'marketing', name: 'Marketing', color: '#EF4444' },
    { id: 'sales', name: 'Sales', color: '#10B981' },
    { id: 'hr', name: 'Human Resources', color: '#F59E0B' },
    { id: 'finance', name: 'Finance', color: '#8B5CF6' },
    { id: 'design', name: 'Design', color: '#EC4899' },
  ],
  loading: false,
  error: null,
  searchQuery: '',
  selectedDepartments: [],
  selectedRatings: [],
  currentPage: 1,
  totalPages: 1,
};

function hrReducer(state: HRState, action: HRAction): HRState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EMPLOYEES':
      return { 
        ...state, 
        employees: action.payload,
        totalPages: Math.ceil(action.payload.length / 12)
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_BOOKMARK':
      return { 
        ...state, 
        bookmarks: [...state.bookmarks, action.payload] 
      };
    case 'REMOVE_BOOKMARK':
      return { 
        ...state, 
        bookmarks: state.bookmarks.filter(id => id !== action.payload) 
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    case 'SET_SELECTED_DEPARTMENTS':
      return { ...state, selectedDepartments: action.payload, currentPage: 1 };
    case 'SET_SELECTED_RATINGS':
      return { ...state, selectedRatings: action.payload, currentPage: 1 };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp.id === action.payload.id ? action.payload : emp
        )
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      };
    default:
      return state;
  }
}

const HRContext = createContext<{
  state: HRState;
  dispatch: React.Dispatch<HRAction>;
} | null>(null);

export function HRContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(hrReducer, initialState);

  useEffect(() => {
    const loadEmployees = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const employees = await fetchEmployees();
        dispatch({ type: 'SET_EMPLOYEES', payload: employees });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load employees' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadEmployees();
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('hr-bookmarks');
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      bookmarks.forEach((id: string) => {
        dispatch({ type: 'ADD_BOOKMARK', payload: id });
      });
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('hr-bookmarks', JSON.stringify(state.bookmarks));
  }, [state.bookmarks]);

  return (
    <HRContext.Provider value={{ state, dispatch }}>
      {children}
    </HRContext.Provider>
  );
}

export function useHRContext() {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHRContext must be used within HRContextProvider');
  }
  return context;
}