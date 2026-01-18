
import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  UserSquare2, 
  History, 
  BarChart3, 
  Settings, 
  Warehouse
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'cashier', label: 'Kasir', icon: <ShoppingCart size={20} /> },
  { id: 'history', label: 'Riwayat', icon: <History size={20} /> },
  { id: 'reports', label: 'Laporan', icon: <BarChart3 size={20} /> },
  { id: 'products', label: 'Produk', icon: <Package size={20} /> },
  { id: 'stock', label: 'Stok', icon: <Warehouse size={20} /> },
  { id: 'customers', label: 'Pelanggan', icon: <Users size={20} /> },
  { id: 'employees', label: 'Pegawai', icon: <UserSquare2 size={20} /> },
  { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} /> },
];

export const INITIAL_RECEIPT_SETTINGS = {
  businessName: 'Kasir Raka',
  address: 'Jl. Contoh No. 123, Kota Kreatif',
  footer: 'Terima kasih telah berbelanja!',
  watermark: 'ORIGINAL',
  logoUrl: '',
  qrisUrl: ''
};
