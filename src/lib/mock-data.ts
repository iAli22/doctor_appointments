
export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  availability: string;
  location: string;
  rating: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  timeSlot: string;
  date: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const specialties = [
  "All",
  "Cardiology",
  "Dermatology",
  "Family Medicine",
  "Neurology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Urology"
];

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Cardiology",
    availability: "Mon-Fri",
    location: "Downtown Medical Center",
    rating: 4.8
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Dermatology",
    availability: "Tue-Sat",
    location: "Westside Clinic",
    rating: 4.7
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Pediatrics",
    availability: "Mon-Thu",
    location: "Children's Medical Group",
    rating: 4.9
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Orthopedics",
    availability: "Wed-Sun",
    location: "Sports Medicine Institute",
    rating: 4.6
  },
  {
    id: "5",
    name: "Dr. Priya Patel",
    photo: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Neurology",
    availability: "Mon-Fri",
    location: "Neurological Center",
    rating: 4.9
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Psychiatry",
    availability: "Tue-Sat",
    location: "Behavioral Health Partners",
    rating: 4.7
  },
  {
    id: "7",
    name: "Dr. Lisa Davis",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Family Medicine",
    availability: "Mon-Thu",
    location: "Community Health Clinic",
    rating: 4.8
  },
  {
    id: "8",
    name: "Dr. Thomas Martinez",
    photo: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Ophthalmology",
    availability: "Wed-Sun",
    location: "Vision Care Associates",
    rating: 4.5
  },
  {
    id: "9",
    name: "Dr. Jessica Lee",
    photo: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Urology",
    availability: "Mon-Fri",
    location: "Urology Specialists",
    rating: 4.6
  }
];

export const getMockTimeSlots = (date: string): TimeSlot[] => {
  // Generate random availability for time slots
  const startHour = 9;
  const endHour = 17;
  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push({
        id: `${date}-${time}`,
        time,
        available: Math.random() > 0.3 // 70% chance of being available
      });
    }
  }

  return slots;
};
