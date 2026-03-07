/**
 * ValidTrack API Service
 * 
 * Simulates async API calls using dummy data.
 * In a real app, these would be actual HTTP requests.
 * 
 * Uses promises with setTimeout to simulate network latency.
 */

import {
  mockTransactions,
  mockBalance,
  mockCategorySpending,
  mockWeeklyData,
  mockMonthlyData,
} from './dummyData';
import { Transaction, Balance, CategorySpending, ChartDataPoint } from './types';

/**
 * Simulates network delay
 */
const simulateDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches user's balance summary
 */
export const fetchBalance = async (): Promise<Balance> => {
  await simulateDelay();
  return mockBalance;
};

/**
 * Fetches all transactions
 * @param limit - Optional limit on number of transactions
 */
export const fetchTransactions = async (limit?: number): Promise<Transaction[]> => {
  await simulateDelay();
  return limit ? mockTransactions.slice(0, limit) : mockTransactions;
};

/**
 * Fetches a single transaction by ID
 */
export const fetchTransactionById = async (id: string): Promise<Transaction | undefined> => {
  await simulateDelay(400);
  return mockTransactions.find((t) => t.id === id);
};

/**
 * Adds a new transaction
 * In a real app, this would POST to an API
 */
export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  await simulateDelay(600);
  
  const newTransaction: Transaction = {
    ...transaction,
    id: Math.random().toString(36).substr(2, 9),
  };
  
  // In a real app, this would persist to backend
  mockTransactions.unshift(newTransaction);
  
  return newTransaction;
};

/**
 * Fetches category spending breakdown
 */
export const fetchCategorySpending = async (): Promise<CategorySpending[]> => {
  await simulateDelay();
  return mockCategorySpending;
};

/**
 * Fetches weekly spending data for charts
 */
export const fetchWeeklyData = async (): Promise<ChartDataPoint[]> => {
  await simulateDelay();
  return mockWeeklyData;
};

/**
 * Fetches monthly spending data for charts
 */
export const fetchMonthlyData = async (): Promise<ChartDataPoint[]> => {
  await simulateDelay();
  return mockMonthlyData;
};

/**
 * API service object
 * Can be imported as a single object or individual functions
 */
export const api = {
  fetchBalance,
  fetchTransactions,
  fetchTransactionById,
  addTransaction,
  fetchCategorySpending,
  fetchWeeklyData,
  fetchMonthlyData,
};
