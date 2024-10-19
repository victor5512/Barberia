import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User } from 'lucide-react';
// @ts-ignore
import { createItem, readItems, createItemId } from '../firebase';

interface AppointmentFormProps {
  onSubmit: (appointment: { name: string; date: string; time: string; service: string }) => void;
  darkMode: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, darkMode }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let datos ={name, date, time, service};
    onSubmit({ name, date, time, service });
    setName('');
    setDate('');
    setTime('');
    setService('');
    createItemId(datos)
  };

  const inputClass = `w-full pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div className="relative">
        <Calendar className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div className="relative">
        <Clock className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div className="relative">
        <Scissors className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClass}
          required
        >
          <option value="">Select a service</option>
          <option value="haircut">Haircut</option>
          <option value="shave">Shave</option>
          <option value="haircut-and-shave">Haircut & Shave</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300 ease-in-out shadow-md"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;