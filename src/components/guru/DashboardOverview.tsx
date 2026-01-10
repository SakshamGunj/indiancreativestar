import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, TrendingUp } from 'lucide-react';

const DashboardOverview = ({ guruData, students }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Welcome back, {guruData?.teacherName || 'Teacher'}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative">
          <div className="group p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-xs sm:text-sm font-medium text-blue-200/90 uppercase tracking-wide">Students</h3>
              <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-100">{students.length}</p>
            <p className="text-xs text-blue-300/60 mt-1">Total registered</p>
          </div>
          <div className="group p-4 sm:p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-xs sm:text-sm font-medium text-purple-200/90 uppercase tracking-wide">Submissions</h3>
              <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-purple-100">{students.filter(s => s.artworksSubmitted > 0).length}</p>
            <p className="text-xs text-purple-300/60 mt-1">Competition entries</p>
          </div>
          <div className="group p-4 sm:p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-xl border border-green-500/20 hover:border-green-500/30 transition-all duration-200 sm:col-span-1 col-span-1">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-xs sm:text-sm font-medium text-green-200/90 uppercase tracking-wide">Earnings</h3>
              <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-300" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-green-100">₹{guruData?.totalEarnings || 0}</p>
            <p className="text-xs text-green-300/60 mt-1">Total revenue</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;