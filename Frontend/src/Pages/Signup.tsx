import { useRef, useState } from "react";
import { Button } from "../Components/UI/Button";
import Input from "../Components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signup() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 3) {
      alert("Password must be at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      navigate("/");
      alert("Account created! Please sign in.");
    } catch (error: any) {
      alert(error.response?.data?.msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-50 to-blue-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">
            Second Brain
          </h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="space-y-4">
          <Input placeholder="Username" ref={usernameref} />
          <Input placeholder="Password" type="password" ref={passwordref} />

          <Button
            variant="primary"
            text={loading ? "Creating account..." : "Sign Up"}
            size="md"
            onClick={signup}
          />

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
