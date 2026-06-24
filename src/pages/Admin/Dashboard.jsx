import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import ProjectStats from './ProjectStats';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    totalEvents: 0,
  });
  const [dailyData, setDailyData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectDetailedData, setProjectDetailedData] = useState([]); 
  const [socialData, setSocialData] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, dailyRes, projectRes, detailedRes, socialRes, visitorsRes] = await Promise.all([
        axiosInstance.get('/analytics/stats'),
        axiosInstance.get('/analytics/daily-visitors?days=30'),
        axiosInstance.get('/analytics/project-views'),
        axiosInstance.get('/analytics/project-detailed-stats'), 
        axiosInstance.get('/analytics/social-clicks'),
        axiosInstance.get('/analytics/visitors?limit=10'),
      ]);

      setStats(statsRes.data);
      setDailyData(dailyRes.data);
      setProjectData(projectRes.data);
      setProjectDetailedData(detailedRes.data); 
      setSocialData(socialRes.data);
      setRecentVisitors(visitorsRes.data.visitors || []);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ['#00E5FF', '#00B8D4', '#0091EA', '#00E676', '#FFD740'];

  // Calculate total project interactions
  const totalProjectInteractions = projectDetailedData.reduce((sum, p) => {
    return sum + (p.galleryViews || 0) + (p.githubClicks || 0) + (p.liveDemoClicks || 0);
  }, 0);

  const totalGalleryViews = projectDetailedData.reduce((sum, p) => sum + (p.galleryViews || 0), 0);
  const totalGithubClicks = projectDetailedData.reduce((sum, p) => sum + (p.githubClicks || 0), 0);
  const totalDemoClicks = projectDetailedData.reduce((sum, p) => sum + (p.liveDemoClicks || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E5FF]"></div>
          <p className="text-gray-400 mt-4 font-mono text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] px-6 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-[1px] bg-[#00E5FF]/50"></span>
              <span className="text-[#00E5FF] text-xs tracking-widest uppercase font-mono">Analytics Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Portfolio <span className="text-[#00E5FF]">Monitor</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </div>
              <span className="text-gray-500 text-xs font-mono">Live</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                window.location.reload();
              }}
              className="text-gray-400 hover:text-[#00E5FF] text-xs font-mono tracking-widest uppercase transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-sm mb-6 text-sm font-mono">
            ⚠ {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">Total Visits</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalVisitors}</p>
          </div>
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">Unique Users</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.uniqueVisitors}</p>
          </div>
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">Events Tracked</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalEvents}</p>
          </div>
          
          {/* ✅ FIXED: Projects Viewed */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">Project Interactions</p>
            <p className="text-3xl font-bold text-white mt-2">{totalProjectInteractions}</p>
            <div className="flex gap-2 mt-1 text-xs">
              <span className="text-[#00E5FF]">👁 {totalGalleryViews}</span>
              <span className="text-gray-600">|</span>
              <span className="text-[#00E676]">🐙 {totalGithubClicks}</span>
              <span className="text-gray-600">|</span>
              <span className="text-[#FFD740]">🚀 {totalDemoClicks}</span>
            </div>
          </div>
        </div>

        {/* Full Width Daily Visitors Chart */}
        <div className="mb-8">
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-4">📈 Daily Visitors</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2a3a" />
                <XAxis dataKey="date" tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis tick={{ fill: '#666', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: '#0B1B2E', border: '1px solid #00E5FF/30' }}
                  labelStyle={{ color: '#00E5FF' }}
                />
                <Line type="monotone" dataKey="visitors" stroke="#00E5FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="uniqueVisitors" stroke="#00E676" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Stats Component */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <ProjectStats />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Views - Now shows detailed stats */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-4">🚀 Top Projects</h3>
            <div className="space-y-3">
              {projectDetailedData.slice(0, 5).map((p, i) => {
                const total = (p.galleryViews || 0) + (p.githubClicks || 0) + (p.liveDemoClicks || 0);
                return (
                  <div key={p.project} className="border-b border-gray-800/50 pb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{p.project}</span>
                      <span className="text-[#00E5FF] font-mono text-sm">{total} total</span>
                    </div>
                    <div className="flex gap-2 mt-1 text-xs text-gray-500">
                      <span>👁 {p.galleryViews || 0}</span>
                      <span>🐙 {p.githubClicks || 0}</span>
                      <span>🚀 {p.liveDemoClicks || 0}</span>
                    </div>
                  </div>
                );
              })}
              {projectDetailedData.length === 0 && (
                <p className="text-gray-500 text-sm">No project interactions yet</p>
              )}
            </div>
          </div>

          {/* Social Clicks */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-4">🔗 Social Clicks</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={socialData}
                  dataKey="clicks"
                  nameKey="platform"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={{ fill: '#666', fontSize: 12 }}
                >
                  {socialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0B1B2E', border: '1px solid #00E5FF/30' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Visitors */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
            <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-4">🕐 Recent Visitors</h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {recentVisitors.slice(0, 10).map((v, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-800/50 pb-2">
                  <div>
                    <span className="text-gray-300">{v.device?.browser || 'Unknown'}</span>
                    <span className="text-gray-500 ml-2 text-xs">{v.device?.deviceType || 'desktop'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">{v.page?.path || '/'}</span>
                    <span className="text-gray-600 text-xs ml-2">
                      {new Date(v.timestamp || v.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {recentVisitors.length === 0 && (
                <p className="text-gray-500 text-sm">No visitors yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;