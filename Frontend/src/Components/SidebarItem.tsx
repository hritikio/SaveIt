import type { ReactElement } from "react"

const SidebarItem = ({text,icon} : {
  text:string,
    icon:ReactElement             
})=>{
    return (
      <div className="flex">
        <div className="p-2"> {icon}</div>
        <div className="p-2">{text}</div>
      </div>
    );
}

export default SidebarItem