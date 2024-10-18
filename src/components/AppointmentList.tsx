import React from 'react';

interface Appointment {
  name: string;
  date: string;
  time: string;
  service: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  darkMode: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, darkMode }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
      {appointments.map((apt, index) => (
        <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-md mb-2 shadow`}>
          <p><strong>{apt.name}</strong></p>
          <p>{apt.date} at {apt.time}</p>
          <p>Service: {apt.service}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;