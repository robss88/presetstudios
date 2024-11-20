// Dashboard.js
import React from 'react';
import { BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';

function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="p-6 rounded-lg bg-primary-background border border-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-text-secondary text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary mt-1">{value}</h3>
          {trend && (
            <p className="text-[#22c55e] text-sm mt-1 flex items-center gap-1">
              <TrendingUp size={16} />
              {trend}
            </p>
          )}
        </div>
        <div className="p-2 bg-secondary-background rounded-lg">
          <Icon size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,431",
      icon: Users,
      trend: "+11.2% this month"
    },
    {
      title: "Revenue",
      value: "$45,231",
      icon: DollarSign,
      trend: "+4.5% this month"
    },
    {
      title: "Active Sessions",
      value: "1,274",
      icon: BarChart3,
      trend: "+8.1% this month"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
        <p className="text-text-secondary mt-1">Your overview and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <div className="bg-primary-background border border-gray-800 rounded-lg divide-y divide-gray-800">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 hover:bg-secondary-background transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)] flex items-center justify-center">
                  <span className="text-primary-background text-sm font-medium">#{item}</span>
                </div>
                <div>
                  <p className="text-text-primary font-medium">Activity {item}</p>
                  <p className="text-text-secondary text-sm">Details about activity {item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;