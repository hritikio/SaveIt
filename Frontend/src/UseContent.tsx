import axios from "axios";
import { BACKEND_URL } from "./config";
import { useEffect, useState } from "react";

const UseContent = () => {
  const [content, setContent] = useState([]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setContent(response.data.contents);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { contents: content, refresh: fetchContent };
};

export default UseContent;
