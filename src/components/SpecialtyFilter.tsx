
import { specialties } from '@/lib/mock-data';
import { useAppointmentStore } from '@/store/appointmentStore';

const SpecialtyFilter = () => {
  const { selectedSpecialty, setSelectedSpecialty } = useAppointmentStore();

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Filter by Specialty</h2>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSpecialty === specialty
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={selectedSpecialty === specialty}
            aria-label={`Filter by ${specialty} specialty`}
          >
            {specialty}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyFilter;
