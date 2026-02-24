import axios from "axios";
import { BACKEND_URL } from "./config";
import { useEffect, useState } from "react";

const UseContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setContent(response.data.contents || []);
    } catch (error) {
      console.error("Error fetching content:", error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { contents: content, refresh: fetchContent, loading };
};

export default UseContent;
