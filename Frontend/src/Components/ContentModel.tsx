import CrossIcon from "../Icons/CrossIcon";
import { Button } from "./UI/Button";
import Input from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

type ContentType = "Youtube" | "Twitter";

interface ContentModelProps {
  open: boolean;
  onClose: () => void;
}

const ContentModel = ({ open, onClose }: ContentModelProps) => {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, settype] = useState<ContentType>("Youtube");

  async function addcontent() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    if (!title || !link) {
      alert("Please fill in both title and link");
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please sign in first to add content");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          tags: [type],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Content added successfully!");
      // Clear form fields
      if (titleref.current) titleref.current.value = "";
      if (linkref.current) linkref.current.value = "";
      settype("Youtube");
      onClose();
    } catch (error: any) {
      console.error("Error adding content:", error.response?.data);
      if (error.response?.status === 403) {
        alert("Session expired. Please sign in again.");
      } else {
        alert(error.response?.data?.msg || "Failed to add content");
      }
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center text-black">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-4 rounded opacit-100">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>

              <div>
                <Input placeholder={"Title"} ref={titleref} />
                <Input placeholder={"Link"} ref={linkref} />
              </div>

              <div>
                <h1>Type</h1>
                <div className="flex">
                  <Button
                    variant={type === "Youtube" ? "primary" : "secondary"}
                    text="Youtube"
                    size="sm"
                    onClick={() => settype("Youtube")}
                  />

                  <Button
                    variant={type === "Twitter" ? "primary" : "secondary"}
                    text="Twitter"
                    size="sm"
                    onClick={() => settype("Twitter")}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="primary"
                  text="Submit "
                  size="md"
                  onClick={addcontent}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModel;
