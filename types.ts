
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  code: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  debt: number;
}

export interface Employee {
  id: string;
  name: string;
  role: 'admin' | 'cashier';
  phone: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type PaymentMethod = 'cash' | 'non-cash' | 'debt';
export type NonCashType = 'bank' | 'ewallet' | 'qris';

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  total: number;
  paymentMethod: PaymentMethod;
  nonCashType?: NonCashType;
  customerId?: string;
  customerName?: string;
  employeeId: string;
  employeeName: string;
}

export interface ReceiptSettings {
  businessName: string;
  address: string;
  footer: string;
  watermark: string;
  logoUrl?: string;
  qrisUrl?: string;
}
