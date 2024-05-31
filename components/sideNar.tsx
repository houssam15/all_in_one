
import SideNavList from "./sideNavList";
// interface SideNavPropsType{
//   setMainContent:any
// }
export default function SideNar(/*{setMainContent}:SideNavPropsType*/) {
    return (
      <div className="h-[95vh] bg-slate-100 grid col-span-3 rounded-lg grid-row-8 gap-4 ">
        <a href="/" className="text-center text-lg font-bold py-5">All in one</a> 
        <SideNavList />
      </div>
    );
} 