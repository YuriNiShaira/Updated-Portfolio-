import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { email, password },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const { token, admin } = response.data;
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminEmail', admin?.email || email);
      
      if (onLogin) {
        onLogin(token);
      }
      
      navigate('/admin/dashboard');
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('Cannot connect to server. Please check your connection.');
      } else {
        setError(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0B1B2E]/80 backdrop-blur-xl border border-[#00E5FF]/30 rounded-sm p-8 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#00E5FF]/50"></span>
            <span className="text-[#00E5FF] text-xs tracking-widest uppercase font-mono">Secure Access</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            <span className="text-[#00E5FF]">SYSTEM</span>.LOGIN
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-mono">Enter credentials to access analytics</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#030712]/50 border border-gray-700 rounded-sm focus:outline-none focus:border-[#00E5FF] text-gray-200 font-mono transition-all"
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#030712]/50 border border-gray-700 rounded-sm focus:outline-none focus:border-[#00E5FF] text-gray-200 font-mono transition-all"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-sm text-sm font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] font-mono tracking-widest uppercase text-sm rounded-sm hover:bg-[#00E5FF] hover:text-[#030712] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              'Authenticate ->'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs font-mono">
            Encrypted connection • JWT Auth • Session: 30d
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;