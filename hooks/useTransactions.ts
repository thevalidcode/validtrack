/**
 * ValidTrack Custom Hooks
 * 
 * React Query hooks for data fetching and state management.
 * These hooks provide loading, error, and success states automatically.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBalance,
  fetchTransactions,
  fetchCategorySpending,
  fetchWeeklyData,
  fetchMonthlyData,
  addTransaction,
} from '../services/api';
import { Transaction } from '../services/types';

/**
 * Query Keys
 * Centralized query keys for cache management
 */
export const queryKeys = {
  balance: ['balance'],
  transactions: ['transactions'],
  categorySpending: ['categorySpending'],
  weeklyData: ['weeklyData'],
  monthlyData: ['monthlyData'],
};

/**
 * Hook to fetch balance data
 * @returns Query result with balance data, loading, and error states
 */
export const useBalance = () => {
  return useQuery({
    queryKey: queryKeys.balance,
    queryFn: fetchBalance,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch transactions
 * @param limit - Optional limit on number of transactions
 */
export const useTransactions = (limit?: number) => {
  return useQuery({
    queryKey: [...queryKeys.transactions, limit],
    queryFn: () => fetchTransactions(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to add a new transaction
 * Uses mutation to handle optimistic updates
 */
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: Omit<Transaction, 'id'>) => addTransaction(transaction),
    onSuccess: () => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
      queryClient.invalidateQueries({ queryKey: queryKeys.balance });
      queryClient.invalidateQueries({ queryKey: queryKeys.categorySpending });
    },
  });
};

/**
 * Hook to fetch category spending breakdown
 */
export const useCategorySpending = () => {
  return useQuery({
    queryKey: queryKeys.categorySpending,
    queryFn: fetchCategorySpending,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch weekly spending data
 */
export const useWeeklyData = () => {
  return useQuery({
    queryKey: queryKeys.weeklyData,
    queryFn: fetchWeeklyData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch monthly spending data
 */
export const useMonthlyData = () => {
  return useQuery({
    queryKey: queryKeys.monthlyData,
    queryFn: fetchMonthlyData,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
