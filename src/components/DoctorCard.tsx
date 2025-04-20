import { Doctor } from '@/lib/mock-data';
import { Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/appointmentStore';
import { useToast } from '@/hooks/use-toast';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const { selectDoctor, openBookingModal, hasAppointmentWithDoctor, cancelAppointment, getDoctorAppointment } = useAppointmentStore();
  const { toast } = useToast();
  
  const handleAction = () => {
    if (hasAppointmentWithDoctor(doctor.id)) {
      const appointment = getDoctorAppointment(doctor.id);
      if (appointment) {
        cancelAppointment(appointment.id);
        toast({
          title: "Appointment Cancelled",
          description: `Your appointment with Dr. ${doctor.name} has been cancelled.`
        });
      }
    } else {
      selectDoctor(doctor);
      openBookingModal();
    }
  };

  // Generate stars for rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(doctor.rating);
    const hasHalfStar = doctor.rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/4 h-48 sm:h-auto">
          <img 
            src={doctor.photo} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 w-full sm:w-3/4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
            <p className="text-primary font-medium">{doctor.specialty}</p>
            
            <div className="flex items-center mt-2">
              {renderRating()}
              <span className="ml-2 text-gray-600">{doctor.rating}</span>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className="text-gray-700">{doctor.availability}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-700">{doctor.location}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={handleAction}
              className="w-full sm:w-auto"
              variant={hasAppointmentWithDoctor(doctor.id) ? "destructive" : "default"}
              aria-label={hasAppointmentWithDoctor(doctor.id) ? 
                `Cancel appointment with ${doctor.name}` : 
                `Book appointment with ${doctor.name}`}
            >
              {hasAppointmentWithDoctor(doctor.id) ? (
                <>
                  <Trash2 className="mr-1" />
                  Cancel Appointment
                </>
              ) : (
                'Book Appointment'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
