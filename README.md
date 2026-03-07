# ValidTrack - Professional Expense Tracking App 💰

A modern, production-ready expense tracking application built with React Native and Expo. Features beautiful animations, custom charts, and a professional UI.

![ValidTrack](https://img.shields.io/badge/React%20Native-0.81-blue) ![Expo](https://img.shields.io/badge/Expo-54-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## ✨ Features

- 📊 **Dashboard**: Balance overview, spending pie chart, recent transactions
- 💸 **Transactions**: Full list with search and category filtering
- 📈 **Analytics**: Detailed insights with pie and bar charts
- ➕ **Add Expenses**: Easy-to-use modal for adding income/expenses
- 🎨 **Animations**: Smooth Moti animations throughout
- 🎯 **Professional UI**: Clean, modern design with purple theme

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
npm install @tanstack/react-query @react-navigation/stack react-native-svg
```

### 2. Start the Development Server

```bash
npm start
```

### 3. Run on Your Device

- **iOS**: Press `i` or scan with Camera app
- **Android**: Press `a` or scan with Expo Go
- **Web**: Press `w`

## 📁 Project Structure

```
validtrack/
├── app/              # Expo Router setup
├── components/       # Reusable UI components
│   ├── BalanceCard.tsx
│   ├── TransactionItem.tsx
│   ├── ChartCard.tsx
│   ├── FloatingButton.tsx
│   ├── SimplePieChart.tsx
│   └── SimpleBarChart.tsx
├── screens/          # Screen components
│   ├── DashboardScreen.tsx
│   ├── TransactionsScreen.tsx
│   ├── AnalyticsScreen.tsx
│   └── AddExpenseScreen.tsx
├── hooks/            # Custom React Query hooks
├── services/         # API layer & dummy data
├── theme/            # Colors, spacing, typography
└── ...
```

## 🛠️ Tech Stack

- **React Native** + **Expo** - Cross-platform mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation (Stack & Bottom Tabs)
- **TanStack Query** - Data fetching & caching
- **Moti** - Smooth animations
- **React Native Reanimated** - High-performance animations
- **React Native SVG** - Custom charts

## 🎨 Customization

### Change Brand Color

Edit `theme/colors.ts`:

```typescript
export const colors = {
  primary: "#6A0DAD", // Change this
  // ...
};
```

### Add Categories

1. Update `services/types.ts`
2. Add category to `dummyData.ts`
3. Add icon in components

## 📱 App Info

The app includes:

- Animated balance card
- Interactive pie charts
- Category-based filtering
- Beautiful transaction list
- Weekly/monthly bar charts

## 🔄 Backend Integration

Currently uses dummy data. To connect to a real backend:

1. Replace API calls in `services/api.ts`
2. Add authentication
3. Implement data persistence

Example:

```typescript
export const fetchBalance = async () => {
  const response = await fetch("https://api.yourbackend.com/balance");
  return response.json();
};
```

## 🐛 Troubleshooting

**Module not found errors:**

```bash
expo start --clear
```

**Metro bundler issues:**

```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

## 📝 License

This project is for showing my skills, you can't modify :( 
---

**Built with ❤️ using React Native, Expo, and TypeScript**
