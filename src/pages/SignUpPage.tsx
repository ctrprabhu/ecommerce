import React from "react";
import SignUpForm from "../components/auth/SignUpForm";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-4 border-b bg-white">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            ElectroShop
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500 bg-white border-t">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} ElectroShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
