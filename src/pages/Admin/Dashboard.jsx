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
  BarChart,
  Bar,
  Legend
} from 'recharts';
import ProjectStats from './ProjectStats';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    totalEvents: 0,
  });
  const [dailyData, setDailyData] = useState([]);
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
      const [statsRes, dailyRes, detailedRes, socialRes, visitorsRes] = await Promise.all([
        axiosInstance.get('/analytics/stats'),
        axiosInstance.get('/analytics/daily-visitors?days=30'),
        axiosInstance.get('/analytics/project-detailed-stats'), 
        axiosInstance.get('/analytics/social-clicks'),
        axiosInstance.get('/analytics/visitors?limit=25'), 
      ]);

      setStats(statsRes.data);
      setDailyData(dailyRes.data);
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

  const COLORS = ['#00E5FF', '#0091EA', '#00E676', '#FFD740', '#FF5252'];

  // Filter out admin routes from recent visitors
  const filteredVisitors = recentVisitors.filter(v => {
    const path = v.page?.path;
    return path !== '/admin/login' && path !== '/admin/dashboard';
  });

  // Calculate total project interactions
  const totalProjectInteractions = projectDetailedData.reduce((sum, p) => {
    return sum + (p.galleryViews || 0) + (p.githubClicks || 0) + (p.liveDemoClicks || 0);
  }, 0);

  const totalGalleryViews = projectDetailedData.reduce((sum, p) => sum + (p.galleryViews || 0), 0);
  const totalGithubClicks = projectDetailedData.reduce((sum, p) => sum + (p.githubClicks || 0), 0);
  const totalDemoClicks = projectDetailedData.reduce((sum, p) => sum + (p.liveDemoClicks || 0), 0);

  // Format data specifically for the new Project breakdown Chart
  const formattedProjectChartData = projectDetailedData.map(p => ({
    name: p.project,
    Views: p.galleryViews || 0,
    GitHub: p.githubClicks || 0,
    Demo: p.liveDemoClicks || 0,
  })).slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E5FF]"></div>
          <p className="text-slate-400 mt-4 font-mono text-sm tracking-wider">Loading analytics assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 px-4 sm:px-6 py-8 selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800/60 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
              <span className="text-[#00E5FF] text-xs tracking-widest uppercase font-mono font-semibold">Console System</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0091EA]">Monitor</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
              </span>
              <span className="text-slate-400 text-xs font-mono font-medium">Live Feed</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                window.location.reload();
              }}
              className="text-slate-400 hover:text-red-400 text-xs font-mono tracking-widest uppercase transition-colors flex items-center gap-1"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-mono">
            <svg className="w-5 h-5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 transition-all hover:border-slate-700/60">
            <div className="flex justify-between items-start">
              <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">Total Visits</p>
              <span className="p-1.5 bg-slate-800/60 rounded-md text-[#00E5FF]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-white mt-2 tracking-tight">{stats.totalVisitors.toLocaleString()}</p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 transition-all hover:border-slate-700/60">
            <div className="flex justify-between items-start">
              <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">Unique Users</p>
              <span className="p-1.5 bg-slate-800/60 rounded-md text-[#0091EA]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-white mt-2 tracking-tight">{stats.uniqueVisitors.toLocaleString()}</p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 transition-all hover:border-slate-700/60">
            <div className="flex justify-between items-start">
              <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">Events Tracked</p>
              <span className="p-1.5 bg-slate-800/60 rounded-md text-[#00E676]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-white mt-2 tracking-tight">{stats.totalEvents.toLocaleString()}</p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 transition-all hover:border-slate-700/60">
            <div className="flex justify-between items-start">
              <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">Interactions</p>
              <span className="p-1.5 bg-slate-800/60 rounded-md text-[#FFD740]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-white mt-2 tracking-tight">{totalProjectInteractions.toLocaleString()}</p>
            <div className="flex gap-3 mt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span> Views {totalGalleryViews}</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00E676]"></span> Git {totalGithubClicks}</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FFD740]"></span> Demo {totalDemoClicks}</span>
            </div>
          </div>
        </div>

        {/* Daily Visitors Chart */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-4 h-4 text-[#00E5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <h3 className="text-white font-mono text-sm font-semibold tracking-wider uppercase">Daily Traffic Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#334155' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#334155' }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
              />
              <Line type="monotone" name="Total Visits" dataKey="visitors" stroke="#00E5FF" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
              <Line type="monotone" name="Unique Visitors" dataKey="uniqueVisitors" stroke="#00E676" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Stats Component */}
        <div>
          <ProjectStats />
        </div>

        {/* Analytical Breakdown Deep Dive section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Project Interaction Breakdown Bar Chart */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 lg:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-4 h-4 text-[#00E5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
              <h3 className="text-white font-mono text-sm font-semibold tracking-wider uppercase">Project Interactions Breakdown</h3>
            </div>
            
            {formattedProjectChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={formattedProjectChartData} layout="vertical" barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#334155' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#e2e8f0', fontSize: 11 }} width={90} axisLine={{ stroke: '#334155' }} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '10px' }} />
                  <Bar dataKey="Views" stackId="a" fill="#00E5FF" radius={[0, 0, 0, 0]} barSize={12} />
                  <Bar dataKey="GitHub" stackId="a" fill="#00E676" radius={[0, 0, 0, 0]} barSize={12} />
                  <Bar dataKey="Demo" stackId="a" fill="#FFD740" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-slate-500 text-sm font-mono">
                No project metrics compiled
              </div>
            )}
          </div>

          {/* Social Clicks Pie Chart with Side Legend */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-[#0091EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5l1.5-1.5m3.033-7.364l1.5-1.5a4 4 0 00-5.656-5l-4 4a4 4 0 005.656 5.656l1.1-1.1" /></svg>
              <h3 className="text-white font-mono text-sm font-semibold tracking-wider uppercase">Social Distribution</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-[260px]">
              <div className="w-full sm:w-1/2 h-[200px] sm:h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={socialData}
                      dataKey="clicks"
                      nameKey="platform"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {socialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#0f172a" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Explicit side legend custom designed */}
              <div className="w-full sm:w-1/2 space-y-2 overflow-y-auto max-h-[220px] pr-2">
                {socialData.map((entry, index) => (
                  <div key={entry.platform} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/40">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      <span className="text-slate-200 text-xs font-mono font-medium truncate">{entry.platform}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-xs font-semibold pl-2">{entry.clicks} clicks</span>
                  </div>
                ))}
                {socialData.length === 0 && (
                  <p className="text-slate-500 text-xs font-mono text-center sm:text-left">No click interactions recorded</p>
                )}
              </div>
            </div>
          </div>

          {/* Full-width Row Filtered Recent Activity Logs */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 lg:col-span-12">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-4 h-4 text-[#FFD740]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-white font-mono text-sm font-semibold tracking-wider uppercase">Live Activity Logs</h3>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-slate-800/60">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <th className="py-3 px-4">Browser / Environment</th>
                    <th className="py-3 px-4">Device</th>
                    <th className="py-3 px-4">Endpoint Path</th>
                    <th className="py-3 px-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filteredVisitors.slice(0, 10).map((v, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-4 text-slate-200 font-medium">{v.device?.browser || 'Unknown'}</td>
                      <td className="py-3 px-4 text-slate-400">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] uppercase tracking-wide">
                          {v.device?.deviceType || 'desktop'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#00E5FF] font-semibold">{v.page?.path || '/'}</td>
                      <td className="py-3 px-4 text-right text-slate-500">
                        {new Date(v.timestamp || v.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                  {filteredVisitors.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 font-mono">
                        No unique visitor sessions tracked matching filter requirements.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;