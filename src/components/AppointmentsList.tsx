
import { useAppointmentStore } from '@/store/appointmentStore';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const AppointmentsList = () => {
  const { appointments, getDoctorById, cancelAppointment } = useAppointmentStore();
  const { toast } = useToast();

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
        <p className="text-gray-500">You don't have any appointments scheduled.</p>
      </div>
    );
  }

  const handleCancelAppointment = (appointmentId: string, doctorName: string) => {
    cancelAppointment(appointmentId);
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment with Dr. ${doctorName} has been cancelled.`
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => {
          const doctor = getDoctorById(appointment.doctorId);
          if (!doctor) return null;

          return (
            <div 
              key={appointment.id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-primary"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-primary text-sm">{doctor.specialty}</p>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{appointment.date}</span>
                  <Clock className="h-4 w-4 text-gray-500 ml-3 mr-1" />
                  <span className="text-sm text-gray-700">{appointment.timeSlot}</span>
                </div>
              </div>
              <div className="mt-2 flex items-start justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{doctor.location}</span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="ml-4"
                    >
                      <Trash2 className="mr-1" />
                      Cancel Appointment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel your appointment with Dr. {doctor.name}? 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleCancelAppointment(appointment.id, doctor.name)}
                      >
                        Yes, Cancel Appointment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsList;
