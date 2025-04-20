import { create } from 'zustand';
import { Appointment, Doctor, mockDoctors } from '@/lib/mock-data';

interface AppointmentState {
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  selectedDate: string;
  isBookingModalOpen: boolean;
  activeTab: 'doctors' | 'appointments';
  selectedSpecialty: string;
  
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
  selectDoctor: (doctor: Doctor) => void;
  setSelectedDate: (date: string) => void;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  setActiveTab: (tab: 'doctors' | 'appointments') => void;
  setSelectedSpecialty: (specialty: string) => void;
  getDoctorById: (id: string) => Doctor | undefined;
  hasAppointmentWithDoctor: (doctorId: string) => boolean;
  getDoctorAppointment: (doctorId: string) => Appointment | undefined;
}

// Load initial appointments from localStorage
const getStoredAppointments = (): Appointment[] => {
  const stored = localStorage.getItem('appointments');
  return stored ? JSON.parse(stored) : [];
};

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: getStoredAppointments(),
  selectedDoctor: null,
  selectedDate: new Date().toISOString().split('T')[0],
  isBookingModalOpen: false,
  activeTab: 'doctors',
  selectedSpecialty: 'All',
  
  addAppointment: (appointment) => {
    set((state) => {
      const newAppointments = [...state.appointments, appointment];
      localStorage.setItem('appointments', JSON.stringify(newAppointments));
      return {
        appointments: newAppointments,
        isBookingModalOpen: false
      };
    });
  },
  
  cancelAppointment: (appointmentId) => {
    set((state) => {
      const newAppointments = state.appointments.filter((apt) => apt.id !== appointmentId);
      localStorage.setItem('appointments', JSON.stringify(newAppointments));
      return {
        appointments: newAppointments
      };
    });
  },
  
  selectDoctor: (doctor) => {
    set({ selectedDoctor: doctor });
  },
  
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
  
  openBookingModal: () => {
    set({ isBookingModalOpen: true });
  },
  
  closeBookingModal: () => {
    set({ isBookingModalOpen: false });
  },
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  
  setSelectedSpecialty: (specialty) => {
    set({ selectedSpecialty: specialty });
  },
  
  getDoctorById: (id) => {
    return mockDoctors.find(doctor => doctor.id === id);
  },
  
  hasAppointmentWithDoctor: (doctorId) => {
    return get().appointments.some(apt => apt.doctorId === doctorId);
  },
  
  getDoctorAppointment: (doctorId) => {
    return get().appointments.find(apt => apt.doctorId === doctorId);
  }
}));
