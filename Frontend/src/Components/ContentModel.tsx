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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
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
      // Clear form fields
      if (titleref.current) titleref.current.value = "";
      if (linkref.current) linkref.current.value = "";
      settype("Youtube");
      onClose();
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Session expired. Please sign in again.");
      } else {
        alert(error.response?.data?.msg || "Failed to add content");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add Content</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input placeholder="Enter title" ref={titleref} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link
            </label>
            <Input placeholder="Paste YouTube or Twitter link" ref={linkref} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Content Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => settype("Youtube")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === "Youtube"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">🎥</div>
                <div className="font-medium">YouTube</div>
              </button>
              <button
                onClick={() => settype("Twitter")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === "Twitter"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">🐦</div>
                <div className="font-medium">Twitter</div>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              text={loading ? "Adding..." : "Add Content"}
              size="md"
              onClick={addcontent}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModel;
