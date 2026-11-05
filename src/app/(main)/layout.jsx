import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-unievents-bg text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
