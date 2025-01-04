
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"



const chartConfig = {
    views: {
        label: "Sales",
    }
} satisfies ChartConfig


type SalesData = {
    amount: number,
    date_of_sale: string,
    id: number
}

type MarketingData = {
    amount: number,
    leads: number,
    date_of_meeting: string,
    id: number

}
type BarChartProps = {
    dataItems: SalesData[] | MarketingData[],
    chartTitle?: string,
    chartDescription?: string
}


const BarChartComponent: React.FC<BarChartProps> = ({ dataItems, chartTitle, chartDescription }: BarChartProps) => {



    return (
        <Card className="bg-black " style={{ border: 'none' }}>
            {chartTitle && (
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        {chartTitle && <CardTitle>{chartTitle}</CardTitle>}
                        {chartDescription && <CardDescription>{chartDescription}</CardDescription>}

                    </div>

                </CardHeader>

            )}
            <CardContent className="px-2 sm:p-6 bg-[var(--component-bg-color)] rounded-lg">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                    style={{ border: 'none' }}
                >
                    <BarChart
                        accessibilityLayer
                        data={dataItems}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="date_of_sale"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent className="sm:w-[250px] text-white text-xl font-semibold capitalize" hideLabel />}
                        />
                        {/* <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="sm:w-[250px] bg-black text-white text-xl font-semibold"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        /> */}

                        <Bar dataKey="amount" fill={`var(--primary-bar-item-color)`} className="hover:fill-[var(--hover-bar-item-color)]" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BarChartComponent