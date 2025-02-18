interface Products {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
interface NewProduct {
  name: String;
  price: number;
  rating?: number;
  stockQuantity: number;
}

interface Sales {
  saleId: String;
  productId: String;
  timestamp: Date;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

interface Purchases {
  purchaseId: String;
  productId: String;
  timestamp: Date;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

interface Expenses {
  expenseId: String;
  category: String;
  amount: number;
  timestamp: Date;
}

interface SalesSummary {
  salesSummaryId: String;
  totalValue: number;
  changePercentage?: number;
  date: Date;
}

interface PurchaseSummary {
  purchaseSummaryId: String;
  totalPurchased: number;
  changePercentage: number;
  date: Date;
}

interface ExpenseSummary {
  expenseSummaryId: String;
  totalExpenses: number;
  date: Date;
}

interface ExpenseByCategory {
  expenseByCategoryId: String;
  expenseSummaryId: String;
  category: String;
  amount: number;
  date: Date;
}
export type {
  ExpenseByCategory,
  ExpenseSummary,
  Expenses,
  Products,
  PurchaseSummary,
  Purchases,
  Sales,
  SalesSummary,
  NewProduct,
};
