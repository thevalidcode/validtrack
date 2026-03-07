/**
 * ValidTrack Dummy Data
 * 
 * Realistic mock data for development and testing.
 * In a real app, this would come from an API.
 */

import { Transaction, Balance, CategorySpending, ChartDataPoint } from './types';
import { colors } from '../theme';

/**
 * Mock Transactions
 * Last 30 days of transaction history
 */
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 45.50,
    category: 'food',
    type: 'expense',
    description: 'Grocery Shopping',
    date: '2026-03-06T10:30:00Z',
    notes: 'Weekly groceries at Whole Foods',
  },
  {
    id: '2',
    amount: 3200.00,
    category: 'bills',
    type: 'income',
    description: 'Monthly Salary',
    date: '2026-03-05T09:00:00Z',
  },
  {
    id: '3',
    amount: 12.99,
    category: 'entertainment',
    type: 'expense',
    description: 'Netflix Subscription',
    date: '2026-03-04T14:20:00Z',
  },
  {
    id: '4',
    amount: 25.00,
    category: 'transport',
    type: 'expense',
    description: 'Uber to Airport',
    date: '2026-03-03T07:45:00Z',
  },
  {
    id: '5',
    amount: 89.99,
    category: 'shopping',
    type: 'expense',
    description: 'New Running Shoes',
    date: '2026-03-02T16:30:00Z',
    notes: 'Nike Air Zoom Pegasus',
  },
  {
    id: '6',
    amount: 120.00,
    category: 'bills',
    type: 'expense',
    description: 'Electricity Bill',
    date: '2026-03-01T11:00:00Z',
  },
  {
    id: '7',
    amount: 65.50,
    category: 'health',
    type: 'expense',
    description: 'Pharmacy - Medications',
    date: '2026-02-28T13:15:00Z',
  },
  {
    id: '8',
    amount: 32.00,
    category: 'food',
    type: 'expense',
    description: 'Dinner at Italian Restaurant',
    date: '2026-02-27T19:30:00Z',
  },
  {
    id: '9',
    amount: 15.50,
    category: 'transport',
    type: 'expense',
    description: 'Gas Station',
    date: '2026-02-26T08:20:00Z',
  },
  {
    id: '10',
    amount: 99.00,
    category: 'entertainment',
    type: 'expense',
    description: 'Concert Tickets',
    date: '2026-02-25T20:00:00Z',
    notes: 'Taylor Swift Eras Tour',
  },
  {
    id: '11',
    amount: 55.00,
    category: 'food',
    type: 'expense',
    description: 'Coffee Shop & Lunch',
    date: '2026-02-24T12:30:00Z',
  },
  {
    id: '12',
    amount: 200.00,
    category: 'shopping',
    type: 'expense',
    description: 'Zara - New Outfit',
    date: '2026-02-23T15:45:00Z',
  },
  {
    id: '13',
    amount: 40.00,
    category: 'health',
    type: 'expense',
    description: 'Gym Membership',
    date: '2026-02-22T09:00:00Z',
  },
  {
    id: '14',
    amount: 18.75,
    category: 'food',
    type: 'expense',
    description: 'Starbucks',
    date: '2026-02-21T08:00:00Z',
  },
  {
    id: '15',
    amount: 75.00,
    category: 'bills',
    type: 'expense',
    description: 'Internet Bill',
    date: '2026-02-20T10:30:00Z',
  },
];

/**
 * Mock Balance Data
 */
export const mockBalance: Balance = {
  total: 8450.25,
  income: 3200.00,
  expenses: 1124.23,
  monthlyChange: 12.5, // 12.5% increase from last month
};

/**
 * Mock Category Spending Data
 * For pie charts and analytics
 */
export const mockCategorySpending: CategorySpending[] = [
  {
    category: 'food',
    amount: 245.75,
    percentage: 28,
    color: colors.food,
  },
  {
    category: 'shopping',
    amount: 289.99,
    percentage: 33,
    color: colors.shopping,
  },
  {
    category: 'transport',
    amount: 85.50,
    percentage: 10,
    color: colors.transport,
  },
  {
    category: 'entertainment',
    amount: 111.99,
    percentage: 13,
    color: colors.entertainment,
  },
  {
    category: 'bills',
    amount: 195.00,
    percentage: 22,
    color: colors.bills,
  },
  {
    category: 'health',
    amount: 105.50,
    percentage: 12,
    color: colors.health,
  },
];

/**
 * Mock Weekly Spending Data
 * For bar/line charts
 */
export const mockWeeklyData: ChartDataPoint[] = [
  { label: 'Mon', value: 45.50, date: '2026-03-03' },
  { label: 'Tue', value: 89.99, date: '2026-03-04' },
  { label: 'Wed', value: 32.00, date: '2026-03-05' },
  { label: 'Thu', value: 120.50, date: '2026-03-06' },
  { label: 'Fri', value: 65.75, date: '2026-03-07' },
  { label: 'Sat', value: 145.20, date: '2026-03-08' },
  { label: 'Sun', value: 78.90, date: '2026-03-09' },
];

/**
 * Mock Monthly Spending Data
 * For analytics overview
 */
export const mockMonthlyData: ChartDataPoint[] = [
  { label: 'Jan', value: 1200, date: '2026-01-01' },
  { label: 'Feb', value: 980, date: '2026-02-01' },
  { label: 'Mar', value: 1124.23, date: '2026-03-01' },
];
