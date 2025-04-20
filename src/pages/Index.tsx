
import DoctorDirectory from '@/components/DoctorDirectory';
import AppointmentsList from '@/components/AppointmentsList';
import BookingModal from '@/components/BookingModal';
import Layout from '@/components/Layout';
import { useAppointmentStore } from '@/store/appointmentStore';

const Index = () => {
  const { activeTab } = useAppointmentStore();

  return (
    <Layout>
      {activeTab === 'doctors' ? <DoctorDirectory /> : <AppointmentsList />}
      <BookingModal />
    </Layout>
  );
};

export default Index;
