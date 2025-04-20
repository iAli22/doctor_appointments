
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAppointmentStore } from '@/store/appointmentStore';
import { getMockTimeSlots, TimeSlot } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const BookingModal = () => {
  const { toast } = useToast();
  const { 
    selectedDoctor, 
    isBookingModalOpen, 
    closeBookingModal, 
    selectedDate,
    setSelectedDate,
    addAppointment
  } = useAppointmentStore();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  useEffect(() => {
    if (isBookingModalOpen && date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setSelectedDate(formattedDate);
      setTimeSlots(getMockTimeSlots(formattedDate));
      setSelectedTimeSlot(null);
    }
  }, [isBookingModalOpen, date, setSelectedDate]);
  
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      const formattedDate = format(newDate, 'yyyy-MM-dd');
      setSelectedDate(formattedDate);
      setTimeSlots(getMockTimeSlots(formattedDate));
      setSelectedTimeSlot(null);
    }
  };
  
  const handleConfirm = () => {
    if (!selectedDoctor || !selectedTimeSlot) return;
    
    const newAppointment = {
      id: `app-${Date.now()}`,
      doctorId: selectedDoctor.id,
      timeSlot: selectedTimeSlot,
      date: selectedDate
    };
    
    addAppointment(newAppointment);
    toast({
      title: "Appointment Confirmed",
      description: `Your appointment with ${selectedDoctor.name} on ${format(
        new Date(selectedDate),
        'MMMM d, yyyy'
      )} at ${selectedTimeSlot} has been scheduled.`,
      duration: 5000,
    });
  };
  
  if (!selectedDoctor) return null;
  
  return (
    <Dialog open={isBookingModalOpen} onOpenChange={closeBookingModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Select a date and time for your appointment with Dr. {selectedDoctor.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
            <p className="text-primary">{selectedDoctor.specialty}</p>
            <p className="text-sm text-gray-500">{selectedDoctor.location}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="appointment-date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="appointment-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Available Time Slots</Label>
              <div className="mt-2">
                {timeSlots.length > 0 ? (
                  <RadioGroup value={selectedTimeSlot || undefined} onValueChange={setSelectedTimeSlot}>
                    <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto p-1">
                      {timeSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center">
                          <RadioGroupItem
                            value={slot.time}
                            id={slot.id}
                            disabled={!slot.available}
                            className={cn(
                              !slot.available && "opacity-50"
                            )}
                          />
                          <Label
                            htmlFor={slot.id}
                            className={cn(
                              "ml-2",
                              !slot.available && "text-gray-400"
                            )}
                          >
                            {slot.time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No available slots for this date.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={closeBookingModal}>Cancel</Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedTimeSlot}
            aria-label="Confirm appointment booking"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
