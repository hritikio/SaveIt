import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem = ({
  text,
  icon,
  active = false,
  onClick,
}: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
        ${
          active
            ? "bg-purple-100 text-purple-700"
            : "hover:bg-purple-50 text-gray-700 hover:text-purple-700"
        }
      `}
    >
      <div
        className={`transition-colors ${
          active ? "text-purple-600" : "text-gray-600"
        }`}
      >
        {icon}
      </div>
      <div className="font-medium">{text}</div>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600"></div>
      )}
    </div>
  );
};

export default SidebarItem;
