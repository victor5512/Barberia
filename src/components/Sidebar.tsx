import React from 'react';
import { X, PieChart, Scissors, Calendar, Users } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, darkMode }) => {
  const sidebarClass = `fixed top-0 left-0 h-full w-64 ${
    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
  } p-4 shadow-lg transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-300 ease-in-out z-30`;

  const menuItems = [
    { icon: <PieChart size={20} />, text: 'Dashboard' },
    { icon: <Scissors size={20} />, text: 'Services' },
    { icon: <Calendar size={20} />, text: 'Appointments' },
    { icon: <Users size={20} />, text: 'Clients' },
  ];

  return (
    <div className={sidebarClass}>
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        }`}
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-8">Menu</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;