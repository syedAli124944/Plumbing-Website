import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '@/lib/admin.service';
import { formatDistanceToNow } from 'date-fns';
import { LayoutDashboard, Calendar, FileText, Users, Star, BookOpen, Mail, Settings, LogOut, Menu, X, Droplets } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Calendar, label: 'Appointments', id: 'appointments' },
  { icon: FileText, label: 'Quotes', id: 'quotes' },
  { icon: Users, label: 'Customers', id: 'customers' },
  { icon: Star, label: 'Testimonials', id: 'testimonials' },
  { icon: BookOpen, label: 'Blog', id: 'blog' },
  { icon: Mail, label: 'Messages', id: 'messages' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

const STATS = [
  { label: 'Total Customers', value: '248', change: '+12%', color: 'bg-blue/10 text-blue' },
  { label: 'Appointments', value: '34', change: '+8%', color: 'bg-green/10 text-green' },
  { label: 'Pending Quotes', value: '12', change: '-3%', color: 'bg-accent/10 text-accent' },
  { label: 'Unread Messages', value: '7', change: '+2', color: 'bg-red/10 text-red' },
];

const RECENT_ACTIVITY = [
  { action: 'New appointment booked', detail: 'John Smith — Emergency Plumbing', time: '5 min ago' },
  { action: 'Quote submitted', detail: 'Sarah Johnson — Drain Cleaning', time: '23 min ago' },
  { action: 'Testimonial received', detail: '5-star review from Mike Williams', time: '1 hour ago' },
  { action: 'Message received', detail: 'Tom Wilson — Bathroom remodel inquiry', time: '2 hours ago' },
  { action: 'Appointment completed', detail: 'Emily Davis — Leak Detection', time: '3 hours ago' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [data, setData] = useState({ appointments: [], quotes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const recentActivity = [
    ...data.appointments.map((a: any) => ({
      type: 'appointment',
      action: 'New appointment booked',
      detail: `${a.customer?.name} — ${a.serviceType}`,
      time: a.createdAt,
    })),
    ...data.quotes.map((q: any) => ({
      type: 'quote',
      action: 'Quote requested',
      detail: `${q.customer?.name} — ${q.serviceType}`,
      time: q.createdAt,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

  return (
    <>
      <SEO title="Admin Dashboard" description="ProPlumb USA admin dashboard" />
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-navy text-white transition-all duration-300 flex flex-col shrink-0`}>
          <div className="p-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue to-blue-light rounded-xl flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-heading font-bold text-lg">ProPlumb</span>}
          </div>

          <nav className="flex-1 py-4 space-y-1 px-3">
            {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
              <button key={id} onClick={() => setActivePage(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage === id ? 'bg-blue text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && label}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && 'Logout'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="font-heading font-semibold text-lg text-gray-900 capitalize">{activePage}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center text-white text-xs font-bold">A</div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-6">
            {activePage === 'dashboard' && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Total Customers</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-heading font-bold text-gray-900">{data.appointments.length + data.quotes.length}</p>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Appointments</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-heading font-bold text-gray-900">{data.appointments.length}</p>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green/10 text-green">+New</span>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Pending Quotes</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-heading font-bold text-gray-900">{data.quotes.length}</p>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Unread Messages</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-heading font-bold text-gray-900">0</p>
                    </div>
                  </motion.div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="font-heading font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {loading ? (
                      <div className="p-6 text-center text-gray-500">Loading data...</div>
                    ) : recentActivity.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">No recent activity</div>
                    ) : (
                      recentActivity.map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.action}</p>
                            <p className="text-xs text-gray-400">{item.detail}</p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
                          </span>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Pending Appointments', count: 8, action: 'View All', color: 'border-blue' },
                    { title: 'New Quote Requests', count: 5, action: 'Review', color: 'border-accent' },
                    { title: 'Unread Reviews', count: 3, action: 'Moderate', color: 'border-green' },
                  ].map(({ title, count, action, color }) => (
                    <div key={title} className={`bg-white rounded-2xl p-6 shadow-card border-l-4 ${color}`}>
                      <p className="text-sm text-gray-500 mb-1">{title}</p>
                      <p className="text-2xl font-heading font-bold text-gray-900 mb-3">{count}</p>
                      <button className="text-sm text-blue font-semibold hover:text-blue-dark transition-colors">{action} →</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePage !== 'dashboard' && (
              <div className="bg-white rounded-2xl p-12 shadow-card border border-gray-100 text-center">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3 capitalize">{activePage}</h2>
                <p className="text-gray-500 mb-6">This section displays the {activePage} management interface with CRUD operations, filtering, and bulk actions.</p>
                <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-2 rounded-lg text-sm font-medium">
                  Data loads from /api/admin/{activePage}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
