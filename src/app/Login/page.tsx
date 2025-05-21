import LoginForm from "./login-form";
import { assets } from "@/mockdata/assets";
import Image from "next/image";

const Login: React.FC = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-10">
        <div className="flex justify-center md:justify-start text-xl font-semibold">
          Appointment Doctor
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm px-4">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src={assets.LoginBg}
          alt="Login Background"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
