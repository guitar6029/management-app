import BarChart from "../components/charts/BarChart";
import useOverview from "../hooks/useOverview";
import useEvents from "@/hooks/useEvents";
import Sliders from "@/components/Sliders";

const SLIDER_SALES = ["Monthly", "Quarterly", "Yearly"];

const Overview: React.FC = () => {


    const { setSelectedTypeForSales, state: overviewState  } = useOverview();
    const { state: eventsState } = useEvents();


    return (
        <div className="min-h-screen p-4 flex flex-col sm:flex-row gap-4">
            <section className="sm:h-[400px] md:h-full   flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Sales</h3>
                    <Sliders sliderItems={SLIDER_SALES} onClickEvent={(eventType: string) => setSelectedTypeForSales(eventType)} />
                </div>
                <BarChart dataItems={overviewState.salesData} />
            </section>

            <section className="flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Events</h3>
                </div>
            </section>

        </div>
    );
}

export default Overview;