import BarChart from "../components/charts/BarChart";
import useOverview from "../hooks/useOverview";
import Sliders from "@/components/Sliders";

const SLIDER_SALES = ["MONTHLY", "QUARTERLY", "YEARLY"];

const Overview : React.FC = () => {


    const {  setSelectedTypeForSales, state } = useOverview();
    
   
    return (  
        <div className="min-h-screen p-4">
            <section className="flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
            <div className="flex flex-row items-center justify-between">
            <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Sales</h3>
            <Sliders sliderItems={SLIDER_SALES} onClickEvent={(eventType: string) => setSelectedTypeForSales(eventType)} />
            </div>
            <BarChart dataItems={state.salesData}   />
            </section>
        </div>
    );
}
 
export default Overview;