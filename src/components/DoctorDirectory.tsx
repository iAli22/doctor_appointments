
import { mockDoctors } from '@/lib/mock-data';
import { useAppointmentStore } from '@/store/appointmentStore';
import DoctorCard from './DoctorCard';
import SpecialtyFilter from './SpecialtyFilter';

const DoctorDirectory = () => {
  const { selectedSpecialty } = useAppointmentStore();
  
  // Filter doctors by specialty
  const filteredDoctors = selectedSpecialty === 'All'
    ? mockDoctors
    : mockDoctors.filter(doctor => doctor.specialty === selectedSpecialty);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Find a Doctor</h1>
      
      <SpecialtyFilter />
      
      <div className="space-y-6" aria-live="polite">
        {filteredDoctors.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No doctors found for the selected specialty.
          </p>
        ) : (
          filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorDirectory;
