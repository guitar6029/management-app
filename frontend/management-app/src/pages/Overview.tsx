import BarChart from "../components/charts/BarChart";
import Dropdown from "@/components/selectors/Dropdown";
import InfoPanel from "@/components/Panels/infoPanel";
import Sliders from "@/components/Sliders";
import useEvents from "@/hooks/useEvents";
import useMarketing from "@/hooks/useMarketing";
import useOverview from "../hooks/useOverview";
import TaskManager from "@/components/Tasks/TaskManager";
const Overview: React.FC = () => {

    const { getSelectedDataTypeForSales, setSelectedTypeForSales, getTimeFrames } = useOverview();
    const { state: marketingState, setSelectedCategoryForMarketing, getSelectedCategoryForMarketing } = useMarketing();
    
    const eventsState = useEvents();
    document.title = "Management | Overview";

    const filteredMarketingData = getSelectedCategoryForMarketing();

    return (
        <div className="p-4 grid grid-cols-2 gap-4">
            <section className="flex flex-col gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Sales</h3>
                        <h6 className="text-[var(--secondary-text-color)] text-base sm:text-lg font-medium">Overview</h6>
                    </div>
                    <Sliders sliderItems={getTimeFrames()} onClickEvent={(eventType: string) => setSelectedTypeForSales(eventType)} />
                </div>
                <BarChart dataItems={getSelectedDataTypeForSales()} />
            </section>

            <section className="flex flex-col gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Marketing</h3>
                        <h6 className="text-[var(--secondary-text-color)] text-base sm:text-lg font-medium">Overview</h6>
                    </div>
                    <Dropdown items={marketingState.availableCategories} onChangeEvent={(value: string) => setSelectedCategoryForMarketing(value)} />
                </div>
                <div className="flex flex-col justify-between">
                    {filteredMarketingData.length > 0 ? (
                        <div className="flex flex-col overflow-y-auto gap-4">
                            {filteredMarketingData.map((event: any) => (
                                <InfoPanel key={event.id} item={event} category="marketing" />
                            ))}
                        </div>
                    ) : (
                        <span className="text-base text-white font-semibold">No marketing data available for the selected category</span>
                    )}
                </div>
            </section>

            
            <section className="sm:col-span-2 col-span-1 flex flex-col gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Events</h3>
                </div>
                {eventsState.events && eventsState.events.length > 0 ? (
                    <div  className="flex flex-col h-[400px] overflow-y-auto gap-4">
                        {eventsState.events.map((event: any) => (
                            <InfoPanel key={event.id} item={event} category="events" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-row items-center">
                        <span className="text-base text-white font-semibold">No upcoming events</span>
                    </div>
                )}
            </section>

            <section className="sm:col-span-2">
                <TaskManager />
            </section>
        </div>
    );
}

export default Overview;
