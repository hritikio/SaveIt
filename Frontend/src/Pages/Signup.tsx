import { useRef } from "react";
import { Button } from "../Components/UI/Button";
import Input from "../Components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      // alert("Signup successful! Please signin to continue.");
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.msg || "Signup failed. Please try again.");
      console.error("Signup error:", error.response?.data);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48">
        <Input placeholder="Username " ref={usernameref} />
        <Input placeholder="Password " ref={passwordref} />
        <Button
          variant="primary"
          text="Signup"
          size="md"
          onClick={() => {
            signup();
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
