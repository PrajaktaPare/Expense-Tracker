import { Home, PieChart, BarChart3, Settings, Plus } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-md mx-auto">
      <button
        className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={24} />
        <span className="text-xs">Home</span>
      </button>
      <button
        className={`flex flex-col items-center ${activeTab === 'stats' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('stats')}
      >
        <PieChart size={24} />
        <span className="text-xs">Stats</span>
      </button>
      <button
        className={`flex flex-col items-center ${activeTab === 'add' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('add')}
      >
        <Plus size={24} />
        <span className="text-xs">Add</span>
      </button>
      <button
        className={`flex flex-col items-center ${activeTab === 'reports' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('reports')}
      >
        <BarChart3 size={24} />
        <span className="text-xs">Reports</span>
      </button>
      <button
        className={`flex flex-col items-center ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('settings')}
      >
        <Settings size={24} />
        <span className="text-xs">Settings</span>
      </button>
    </div>
  );
}