import BookAppointment from "../components/dashboard/Book";
import FindSpeciality from "../components/dashboard/FindSpeciality";
import HeroSection from "../components/dashboard/HeroSection";
import TopDoctors from "../components/dashboard/TopDoctors";

const Dashboard = () => {
  return (
    <>
      <HeroSection />

      <div id="speciality">
        <FindSpeciality />
      </div>
      <TopDoctors />
      <BookAppointment />
    </>
  );
};

export default Dashboard;
