import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Users, Settings } from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import StudentManager from './StudentManager';

const GuruDashboard = ({ user, guruData, students, handleLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview guruData={guruData} students={students} />;
      case 'students':
        return <StudentManager user={user} guruData={guruData} students={students} />;
      default:
        return <DashboardOverview guruData={guruData} students={students} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex font-['Inter']">
      {/* Sidebar */}
      <aside className="w-56 bg-black/20 border-r border-white/10 p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/Daami Presents (1920 x 1080 px) (1000 x 1000 px).webp"
            alt="Indian Creative Star"
            className="h-10 w-10 rounded-lg"
          />
          <div>
            <h2 className="font-semibold text-lg">Guru Portal</h2>
            <p className="text-xs text-white/50">Indian Creative Star</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <Button
            variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="justify-start gap-3"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Overview</span>
          </Button>
          <Button
            variant={activeTab === 'students' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('students')}
            className="justify-start gap-3"
          >
            <Users className="h-5 w-5" />
            <span>Students</span>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </nav>

        <div className="mt-auto">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default GuruDashboard;