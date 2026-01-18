
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from './constants';
import CashierView from './views/CashierView';
import HistoryView from './views/HistoryView';
import ProductsView from './views/ProductsView';
import CustomersView from './views/CustomersView';
import EmployeesView from './views/EmployeesView';
import SettingsView from './views/SettingsView';
import ReportsView from './views/ReportsView';
import StockView from './views/StockView';
import { Product, Customer, Employee, Sale, ReceiptSettings } from './types';
import { INITIAL_RECEIPT_SETTINGS } from './constants';
import { Menu, X, UserSquare2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cashier');
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [receiptSettings, setReceiptSettings] = useState<ReceiptSettings>(INITIAL_RECEIPT_SETTINGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('raka_products');
    const savedCustomers = localStorage.getItem('raka_customers');
    const savedEmployees = localStorage.getItem('raka_employees');
    const savedSales = localStorage.getItem('raka_sales');
    const savedSettings = localStorage.getItem('raka_settings');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedSettings) setReceiptSettings(JSON.parse(savedSettings));
  }, []);

  // Sync with LocalStorage
  useEffect(() => { localStorage.setItem('raka_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('raka_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('raka_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('raka_sales', JSON.stringify(sales)); }, [sales]);
  useEffect(() => { localStorage.setItem('raka_settings', JSON.stringify(receiptSettings)); }, [receiptSettings]);

  const renderContent = () => {
    switch (activeTab) {
      case 'cashier':
        return <CashierView 
          products={products} 
          customers={customers} 
          employees={employees} 
          onSaleComplete={(sale) => {
            setSales([sale, ...sales]);
            const newProducts = products.map(p => {
              const item = sale.items.find(si => si.productId === p.id);
              return item ? { ...p, stock: p.stock - item.quantity } : p;
            });
            setProducts(newProducts);
            if (sale.paymentMethod === 'debt' && sale.customerId) {
              setCustomers(customers.map(c => 
                c.id === sale.customerId ? { ...c, debt: c.debt + sale.total } : c
              ));
            }
          }} 
          settings={receiptSettings}
          onManageEmployees={() => setActiveTab('employees')}
        />;
      case 'history': return <HistoryView sales={sales} settings={receiptSettings} />;
      case 'products': return <ProductsView products={products} setProducts={setProducts} />;
      case 'customers': return <CustomersView customers={customers} setCustomers={setCustomers} />;
      case 'employees': return <EmployeesView employees={employees} setEmployees={setEmployees} />;
      case 'settings': return <SettingsView settings={receiptSettings} setSettings={setReceiptSettings} employees={employees} />;
      case 'reports': return <ReportsView sales={sales} />;
      case 'stock': return <StockView products={products} setProducts={setProducts} />;
      default: return <div className="p-8 text-center font-bold">Menu Tidak Ditemukan</div>;
    }
  };

  const navItemClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen md:flex-row bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6 shrink-0 shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/20">R</div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter leading-none">KASIR RAKA</h1>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Pro Version</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-lg">R</div>
          <h1 className="font-black text-sm tracking-tighter uppercase">Kasir Raka</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-800 rounded-lg">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900 pt-20 p-6 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navItemClick(item.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl gap-3 font-bold transition-all ${
                  activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {item.icon}
                <span className="text-xs uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar md:p-8 pb-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
