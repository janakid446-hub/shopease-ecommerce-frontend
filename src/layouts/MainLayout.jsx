import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer.jsx';
import { MobileNavigation } from '../components/layout/MobileNavigation.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text transition-colors duration-300 dark:bg-secondary dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
