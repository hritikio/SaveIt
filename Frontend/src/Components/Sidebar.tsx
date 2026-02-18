import SidebarItem from "./SidebarItem"
import { TwitterIcon } from "../Icons/Twitter"
import { YTicon } from "../Icons/YTicon"

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div className="pt-4 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
            <SidebarItem text="YouTube" icon={<YTicon />} />

        </div>

    </div>
  )
}

export default Sidebar