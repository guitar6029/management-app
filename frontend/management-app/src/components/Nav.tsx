import { useNavigate } from "react-router-dom";
import Sliders from "./Sliders";
const SLIDER_ITEMS = ["Overview", "Departments", "Tools"];


const Navbar = () => {

    const navigate = useNavigate()


    const handleViewChange = (view : string) => {
        switch ( view) {
            case "Overview":
                navigate("/")
                break;
            case "Departments":
                navigate("/departments")
                break;
            case "Tools":
                navigate("/tools")
                break;
        }
    }



    return (    
        <header className="h-[100px]">
            <nav className="flex items-center justify-between p-4">
                <h2 className="text-white font-extrabold">Apex Business Group</h2>
                <Sliders sliderItems={SLIDER_ITEMS} onClickEvent={(eventType:string) => handleViewChange(eventType)} />
                <div>
                    <span className="text-white">Account</span>
                </div>
            </nav>
        </header>
      );
}
 
export default Navbar;