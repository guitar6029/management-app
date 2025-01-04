import BarChart from "../components/charts/BarChart";
import useOverview from "../hooks/useOverview";
import useEvents from "@/hooks/useEvents";
import useMarketing from "@/hooks/useMarketing";
import Sliders from "@/components/Sliders";
import InfoPanel from "@/components/Panels/infoPanel";

const SLIDER_SALES = ["Monthly", "Quarterly", "Yearly"];

const Overview: React.FC = () => {


    const { setSelectedTypeForSales, state: overviewState } = useOverview();
    const marketingState = useMarketing();
    const eventsState = useEvents();


    return (
        <div className="min-h-screen p-4 grid grid-cols-2 sm:flex-row gap-4">

            {/* two columns left side vertical Sales and Marketing and 2nd col is Events */}
            <div className="flex flex-col gap-4">

                <section className="sm:h-[400px] md:h-[500px]    flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Sales</h3>
                            <h6 className="text-[var(--secondary-text-color)] text-base sm:text-lg font-medium">Overview</h6>

                        </div>
                        <Sliders sliderItems={SLIDER_SALES} onClickEvent={(eventType: string) => setSelectedTypeForSales(eventType)} />
                    </div>
                    <BarChart dataItems={overviewState.salesData} />
                </section>


                <section className="flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Marketing</h3>
                        <h6 className="text-[var(--secondary-text-color)] text-base sm:text-lg font-medium">Overview</h6>
                    </div>
                    <div className="flex flex-col justify-between">
                        {marketingState.marketing && marketingState.marketing.length > 0 && (
                            <div className="flex flex-col min-h-screen overflow-y-auto gap-4">
                                {marketingState.marketing.map((event: any) => (
                                    <InfoPanel key={event.id} item={event} category="marketing" />
                                ))}
                            </div>
                        )}

                    </div>

                </section>

            </div>



            <section className="flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Events</h3>
                </div>

                {eventsState.events && eventsState.events.length > 0 && (
                    <div className="flex flex-col min-h-screen overflow-y-auto gap-4 items-center">
                        {eventsState.events.map((event: any) => (
                            <InfoPanel key={event.id} item={event} category="events" />
                        ))}
                    </div>
                )}

                {eventsState.events && eventsState.events.length === 0 && (
                    <div className="flex flex-row items-center">
                        <span>No upcoming events</span>
                    </div>
                )}

            </section>


        </div>
    );
}

export default Overview;