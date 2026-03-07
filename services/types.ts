/**
 * ValidTrack Type Definitions
 * 
 * Central type definitions for the app's data models.
 */

export type TransactionCategory = 
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'bills'
  | 'health';

export type TransactionType = 'expense' | 'income';

/**
 * Transaction Model
 * Represents a single financial transaction
 */
export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
  date: string; // ISO date string
  notes?: string;
}

/**
 * Balance Summary
 * Represents the user's financial overview
 */
export interface Balance {
  total: number;
  income: number;
  expenses: number;
  monthlyChange: number; // Percentage change from last month
}

/**
 * Category Spending
 * Used for analytics and pie charts
 */
export interface CategorySpending {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  color: string;
}

/**
 * Weekly/Monthly Data Point
 * Used for bar/line charts
 */
export interface ChartDataPoint {
  label: string; // Day name, week, or month
  value: number;
  date: string;
}
