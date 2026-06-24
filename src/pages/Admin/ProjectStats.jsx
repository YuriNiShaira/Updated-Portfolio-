// src/pages/Admin/ProjectStats.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ProjectStats = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/analytics/project-detailed-stats');
        setProjectData(response.data);
      } catch (err) {
        setError('Failed to load project stats');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E5FF]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-center py-8">{error}</div>;
  }

  if (projectData.length === 0) {
    return (
      <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-8 text-center">
        <p className="text-gray-400">No project interactions yet. Click on projects to generate data!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-sm p-6">
      <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-4">
        📊 Project Interaction Breakdown
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={projectData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a3a" />
          <XAxis type="number" tick={{ fill: '#666', fontSize: 10 }} />
          <YAxis type="category" dataKey="project" tick={{ fill: '#666', fontSize: 10 }} width={120} />
          <Tooltip
            contentStyle={{ background: '#0B1B2E', border: '1px solid #00E5FF/30' }}
            labelStyle={{ color: '#00E5FF' }}
          />
          <Legend />
          <Bar dataKey="galleryViews" fill="#00E5FF" name="Gallery Views" />
          <Bar dataKey="githubClicks" fill="#00E676" name="GitHub Clicks" />
          <Bar dataKey="liveDemoClicks" fill="#FFD740" name="Live Demo Clicks" />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-[#030712]/50 rounded p-3 text-center">
          <p className="text-[#00E5FF] text-2xl font-bold">
            {projectData.reduce((sum, p) => sum + p.galleryViews, 0)}
          </p>
          <p className="text-gray-500 text-xs font-mono">Gallery Views</p>
        </div>
        <div className="bg-[#030712]/50 rounded p-3 text-center">
          <p className="text-[#00E676] text-2xl font-bold">
            {projectData.reduce((sum, p) => sum + p.githubClicks, 0)}
          </p>
          <p className="text-gray-500 text-xs font-mono">GitHub Clicks</p>
        </div>
        <div className="bg-[#030712]/50 rounded p-3 text-center">
          <p className="text-[#FFD740] text-2xl font-bold">
            {projectData.reduce((sum, p) => sum + p.liveDemoClicks, 0)}
          </p>
          <p className="text-gray-500 text-xs font-mono">Live Demo Clicks</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;