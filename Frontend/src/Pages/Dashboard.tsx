import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Button } from "../Components/UI/Button";
import { PlusIcon } from "../Icons/PlusIcon";
import ContentModel from "../Components/ContentModel";
import Card from "../Components/Card";
import ShareIcon from "../Icons/ShareIcon";
import UseContent from "../UseContent";
const Dashboard = () => {
  const [modalopen, setModalOpen] = useState(false);
  const { contents, refresh } = UseContent();

  return (
    <div className="flex ">
      <Sidebar />

      <div className="p-4 ml-72 min-h-screen w-full bg-gray-100  border-2 border-gray-300 ">
        <div className="flex justify-end gap-4 ">
          <Button
            startIcon={<PlusIcon size="lg" />}
            size="md"
            variant="primary"
            text="Add Content"
            onClick={() => {
              setModalOpen(true);
            }}
          />
          <Button
            startIcon={<ShareIcon />}
            variant="secondary"
            text="share Brain"
            size="md"
            onClick={() => {}}
          />
        </div>
        <div className="flex gap-4">
          {contents.map(({ tags, link, title, _id }: any) => (
            <Card
              key={_id}
              type={tags?.[0]?.toLowerCase() || "youtube"}
              link={link}
              title={title}
            />
          ))}
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
