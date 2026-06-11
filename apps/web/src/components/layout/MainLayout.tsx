import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { EmergencyBanner } from '../sections/EmergencyBanner';

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <EmergencyBanner /> */}
      <Footer />
    </div>
  );
}
