import Sliders from "./Sliders";


const SLIDER_ITEMS = ["Overview", "Departments", "Finance"];


const Navbar = () => {

    return (    
        <header className="h-[100px]">
            <nav className="flex items-center justify-between p-4">
                <h2 className="text-white font-extrabold">Apex Business Group</h2>
                <Sliders sliderItems={SLIDER_ITEMS} />
                <div>
                    <span className="text-white">Logout</span>
                </div>
            </nav>
        </header>
      );
}
 
export default Navbar;