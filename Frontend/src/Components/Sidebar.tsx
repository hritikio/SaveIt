import SidebarItem from "./SidebarItem";
import { TwitterIcon } from "../Icons/Twitter";
import { YTicon } from "../Icons/YTicon";

type FilterType = "all" | "youtube" | "twitter";

interface SidebarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Sidebar = ({ currentFilter, onFilterChange }: SidebarProps) => {
  return (
    <div className="h-screen bg-white border-r border-gray-200 w-72 fixed left-0 top-0 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-purple-600">SaveIt</h2>
        <p className="text-sm text-gray-500 mt-1">Filter by content type</p>
      </div>

      <div className="p-4 space-y-2">
        <SidebarItem
          text="All Content"
          icon={<span className="text-xl">📚</span>}
          active={currentFilter === "all"}
          onClick={() => onFilterChange("all")}
        />
        <SidebarItem
          text="YouTube"
          icon={<YTicon />}
          active={currentFilter === "youtube"}
          onClick={() => onFilterChange("youtube")}
        />
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon />}
          active={currentFilter === "twitter"}
          onClick={() => onFilterChange("twitter")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
