import { api } from './axios';

export const adminService = {
  async getDashboardData() {
    try {
      const [appointmentsRes, quotesRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/quotes'),
      ]);

      return {
        appointments: appointmentsRes.data?.data || [],
        quotes: quotesRes.data?.data || [],
      };
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      return { appointments: [], quotes: [] };
    }
  }
};
