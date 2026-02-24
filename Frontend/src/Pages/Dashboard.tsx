import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Button } from "../Components/UI/Button";
import { PlusIcon } from "../Icons/PlusIcon";
import ContentModel from "../Components/ContentModel";
import Card from "../Components/Card";
import UseContent from "../UseContent";
import { useNavigate } from "react-router-dom";

type FilterType = "all" | "youtube" | "twitter";

const Dashboard = () => {
  const [modalopen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const { contents, refresh } = UseContent();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const filteredContents = contents.filter((content: any) => {
    if (filter === "all") return true;
    const contentType = content.tags?.[0]?.toLowerCase() || "youtube";
    return contentType === filter;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar currentFilter={filter} onFilterChange={setFilter} />

      <div className="flex-1 ml-72">
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SaveIt</h1>
              <p className="text-sm text-gray-500">Organize your knowledge</p>
            </div>
            <div className="flex gap-3 items-center">
              <Button
                startIcon={<PlusIcon size="lg" />}
                size="md"
                variant="primary"
                text="Add Content"
                onClick={() => setModalOpen(true)}
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {filteredContents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No content yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start Saving Important Links by adding content
              </p>
              <div className="flex justify-center">
                <div className="w-64">
                  <Button
                    startIcon={<PlusIcon size="lg" />}
                    size="md"
                    variant="primary"
                    text="Add Your First Content"
                    onClick={() => setModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map(({ tags, link, title, _id }: any) => {
                const contentType = tags?.[0]?.toLowerCase() || "youtube";
                return (
                  <Card
                    key={_id}
                    id={_id}
                    type={contentType}
                    link={link}
                    title={title}
                    onDelete={refresh}
                  />
                );
              })}
            </div>
          )}
        </div>

        <ContentModel
          open={modalopen}
          onClose={() => {
            setModalOpen(false);
            refresh();
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
