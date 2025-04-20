
import { useAppointmentStore } from '@/store/appointmentStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { activeTab, setActiveTab } = useAppointmentStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container max-w-5xl px-4 sm:px-6 mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Doctor Appointment System</h1>
          <div className="hidden sm:block">
            <Button 
              variant={activeTab === 'doctors' ? 'default' : 'outline'}
              onClick={() => setActiveTab('doctors')}
              className="mr-2"
              aria-label="View doctors directory"
            >
              <User className="h-4 w-4 mr-2" />
              Find Doctors
            </Button>
            <Button 
              variant={activeTab === 'appointments' ? 'default' : 'outline'}
              onClick={() => setActiveTab('appointments')}
              aria-label="View my appointments"
            >
              <Calendar className="h-4 w-4 mr-2" />
              My Appointments
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-5xl px-4 sm:px-6 mx-auto py-6">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'doctors' | 'appointments')}
          className="sm:hidden mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="doctors">
              <User className="h-4 w-4 mr-2" />
              Find Doctors
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="h-4 w-4 mr-2" />
              My Appointments
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </div>
  );
};

export default Layout;
