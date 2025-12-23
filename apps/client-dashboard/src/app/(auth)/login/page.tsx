import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
      <SignIn redirectUrl="/home" />
    </div>
  );
}