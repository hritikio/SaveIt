import { Button } from "../Components/UI/Button";
import Input from "../Components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      console.log("JWT received: ", jwt);
      localStorage.setItem("jwt", jwt);
      //redirect to dashboard
      navigate("/dashboard");
      // alert("Signin successful! Please proceed to dashboard.");
    } catch (error: any) {
      alert(error.response?.data?.msg || "Signin failed. Please try again.");
      console.error("Signin error:", error.response?.data);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48">
        <Input placeholder="Username " ref={usernameref} />
        <Input placeholder="Password " ref={passwordref} />
        <Button
          variant="primary"
          text="Signin"
          size="md"
          onClick={() => {
            signin();
          }}
        />
      </div>
    </div>
  );
};

export default Signin;
