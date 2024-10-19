import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, Menu, Sun, Moon, PieChart } from 'lucide-react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import Sidebar from './components/Sidebar';

interface Appointment {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleAppointmentSubmit = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
      <div className="flex flex-col items-center justify-center p-4">
        <div className={`fixed top-4 left-4 z-20 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Menu size={24} />
          </button>
        </div>
        <div className={`fixed top-4 right-4 z-20 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md ${darkMode ? 'text-black' : 'text-gray-800'}`}>
          <h1 className="text-3xl font-bold mb-6 text-center">Reservar una cita</h1>
          <AppointmentForm onSubmit={handleAppointmentSubmit} darkMode={darkMode} />
          <AppointmentList appointments={appointments} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;