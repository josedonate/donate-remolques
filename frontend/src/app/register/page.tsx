import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/ui/Navbar";
//import Footer from "@/components/ui/Footer";

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-38" />
      <RegisterForm />
      {/*<Footer />*/}
    </main>
  );
}
