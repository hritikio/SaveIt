import { Button } from "../Components/UI/Button";
import Input from "../Components/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signin() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("jwt", jwt);
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.msg || "Signin failed. Please try again.");
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
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <Input placeholder="Username" ref={usernameref} />
          <Input placeholder="Password" type="password" ref={passwordref} />

          <Button
            variant="primary"
            text={loading ? "Signing in..." : "Sign In"}
            size="md"
            onClick={signin}
          />

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
