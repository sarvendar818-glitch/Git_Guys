'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const STAGE_CONFIG = {
  30: {
    label: 'Application Drafted',
    sublabel: 'Your application has been received and is being prepared for submission.',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    borderColor: '#fcd34d',
    icon: '📝',
    stages: ['Received', 'Processing', 'Approved'],
    activeStage: 0,
  },
  70: {
    label: 'Under Ministry Review',
    sublabel: 'Government officials are verifying your documents and eligibility criteria.',
    color: '#3b82f6',
    bgColor: '#dbeafe',
    borderColor: '#93c5fd',
    icon: '🔍',
    stages: ['Received', 'Under Review', 'Approved'],
    activeStage: 1,
  },
  100: {
    label: 'Benefit Approved! 🎉',
    sublabel: 'Congratulations! Your application has been approved. Benefit will be credited soon.',
    color: '#16a34a',
    bgColor: '#dcfce7',
    borderColor: '#86efac',
    icon: '✅',
    stages: ['Received', 'Verified', 'Approved'],
    activeStage: 2,
  },
};

function ProfileTag({ label, value }) {
  if (!value) return null;
  return (
    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
      <span className="text-gray-400 font-medium">{label}:</span> {value}
    </span>
  );
}

function ProgressBar({ progress }) {
  const config = STAGE_CONFIG[progress] || STAGE_CONFIG[30];
  return (
    <div>
      {/* Stage Pills */}
      <div className="flex items-center gap-0 mb-3">
        {config.stages.map((stage, i) => {
          const isActive = i === config.activeStage;
          const isDone = i < config.activeStage;
          return (
            <div key={stage} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all"
                  style={{
                    background: isDone || isActive ? config.color : '#e5e7eb',
                    borderColor: isDone || isActive ? config.color : '#d1d5db',
                    color: isDone || isActive ? 'white' : '#9ca3af',
                  }}
                >
                  {isDone ? '✓' : i + 1}
                </div>
                <span className="text-[10px] font-bold mt-1 text-center leading-tight"
                  style={{ color: isDone || isActive ? config.color : '#9ca3af' }}>
                  {stage}
                </span>
              </div>
              {i < config.stages.length - 1 && (
                <div className="h-0.5 flex-1 mx-1 mb-4 rounded-full transition-all"
                  style={{ background: i < config.activeStage ? config.color : '#e5e7eb' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-3 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          style={{ background: `linear-gradient(90deg, ${config.color}, ${config.color}99)` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs font-bold" style={{ color: config.color }}>{progress}% Complete</span>
        <span className="text-xs text-gray-400 font-medium">{config.label}</span>
      </div>
    </div>
  );
}

function ApplicationCard({ app, index }) {
  const config = STAGE_CONFIG[app.progress] || STAGE_CONFIG[30];
  const date = new Date(app.applied_at);
  const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl border-2 border-gray-50 overflow-hidden group hover:shadow-2xl transition-all duration-300"
    >
      {/* Top accent */}
      <div className="h-1.5 w-full" style={{ background: config.color }} />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{config.icon}</span>
              <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ color: config.color, background: config.bgColor, borderColor: config.borderColor }}>
                {config.label}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight mt-2">
              {app.scheme_name}
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{app.ministry}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400 font-medium">Applied on</p>
            <p className="text-sm font-black text-gray-700">{dateStr}</p>
            <p className="text-xs text-gray-400">{timeStr}</p>
          </div>
        </div>

        {/* ARN */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 mb-5 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Application ID</span>
          <span className="font-mono text-sm font-black text-gray-800 tracking-widest">{app.trackingId}</span>
        </div>

        {/* Citizen Profile */}
        {app.profile && (
          <div className="mb-5">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">👤 Citizen Profile</p>
            <div className="flex flex-wrap gap-2">
              <ProfileTag label="Name" value={app.profile.name} />
              <ProfileTag label="State" value={app.profile.state} />
              <ProfileTag label="Category" value={app.profile.category} />
              <ProfileTag label="Gender" value={app.profile.gender} />
              <ProfileTag label="Occupation" value={app.profile.occupation} />
              <ProfileTag label="Family" value={app.profile.familySize ? `${app.profile.familySize} members` : null} />
              {app.profile.isWidow && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
                  Widow Applicant
                </span>
              )}
            </div>
          </div>
        )}

        {/* Benefit */}
        {app.benefit_amount && (
          <div className="bg-green-50 border border-green-100 rounded-2xl px-5 py-3 mb-5 flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-[10px] text-green-600/60 font-black uppercase tracking-[0.15em]">Scheme Benefit</p>
              <p className="text-base font-black text-gray-900">{app.benefit_amount}</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <ProgressBar progress={app.progress} />

        {/* Sub-label */}
        <p className="text-xs text-gray-500 font-medium mt-3 leading-relaxed">{config.sublabel}</p>
      </div>
    </motion.div>
  );
}

export default function TrackerPage() {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ss_applications') || '[]');
      // Sort newest first
      saved.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));
      setApplications(saved);
    } catch {
      setApplications([]);
    }
  }, []);

  const handleClearAll = () => {
    if (confirm('Clear all saved applications?')) {
      localStorage.removeItem('ss_applications');
      setApplications([]);
    }
  };

  // Stats
  const totalApps = applications?.length || 0;
  const approved = applications?.filter(a => a.progress === 100).length || 0;
  const inProgress = applications?.filter(a => a.progress < 100).length || 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold flex items-center">
            <span className="text-green-600 font-poppins">Scheme</span>
            <span className="text-orange-500 font-poppins">Saathi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/#apply" className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors">
              ← Find More Schemes
            </Link>
            {totalApps > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            📊 Application Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">
            Track My <span className="text-green-600">Applications</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Monitor the status of every scheme you've applied for — all in one place.
          </p>
        </motion.div>

        {/* Stats Row */}
        {applications !== null && totalApps > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {[
              { label: 'Total Applications', value: totalApps, color: 'text-gray-900', bg: 'bg-white', icon: '📋' },
              { label: 'In Progress', value: inProgress, color: 'text-blue-600', bg: 'bg-blue-50', icon: '🔍' },
              { label: 'Approved', value: approved, color: 'text-green-600', bg: 'bg-green-50', icon: '✅' },
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 shadow-sm border border-gray-100 text-center`}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading */}
        {applications === null && (
          <div className="text-center py-24">
            <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-400 font-bold">Loading your applications...</p>
          </div>
        )}

        {/* Empty State */}
        {applications !== null && totalApps === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-inner"
          >
            <div className="text-7xl mb-6">📭</div>
            <h2 className="text-2xl font-black text-gray-700 mb-3">No Applications Yet</h2>
            <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
              You haven't applied to any schemes yet. Find schemes you're eligible for and apply — your applications will appear here.
            </p>
            <Link
              href="/#apply"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-black px-8 py-4 rounded-full shadow-xl text-base transition-all hover:scale-105"
            >
              🔍 Find My Schemes →
            </Link>
          </motion.div>
        )}

        {/* Application Cards */}
        {applications !== null && totalApps > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {applications.map((app, i) => (
                <ApplicationCard key={app.trackingId} app={app} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
