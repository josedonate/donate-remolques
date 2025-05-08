import LoginForm from "@/components/auth/LoginForm";
import Navbar from "@/components/ui/Navbar";
//import Footer from "@/components/ui/Footer";

export default function LoginPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-38" />
      <LoginForm />
      {/*<Footer />*/}
    </main>
  );
}
