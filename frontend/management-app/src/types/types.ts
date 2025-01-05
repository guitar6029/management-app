export type MarketingItem = {
    id: number;
    campaign_name: string;
    start_date: Date;
    end_date: Date;
    budget: number;
    target_audience?: string;
    channels?: string;
    goals?: string;
    performance_metrics?: string;
    status: string;
    created_at?: Date;
    investment_focus?: string;
    technology_used?: string;
    regulatory_compliance?: string;
    risk_management_strategy?: string;
    client_segment?: string;
};

export type DepartmentCategory =
    "HR"
    | "Data"
    | "Development"
    | "Sales"
    | "Marketing"
    | "Finance"
    | "Customer Support"
    | "IT"
    | "Operations"
    | "Administration"

export type Employee = {
    id: number
    name: string,
    email: string,
    department_id: number,
    hire_date: Date,
    position: string

}


export type DepartmentItem = {
    id: number;
    name: DepartmentCategory;
}


export type BaseItem = {
    id: number;
    name: string;
    description?: string;
};

export type EventType = BaseItem & {
    mandatory?: boolean;
    category: 'events';
    date_of_event: Date;
    event_info: string;
};

export type GeneralItem = BaseItem & {
    category: 'general';
    date: Date;
};


export type Item = EventType | GeneralItem;

export const isEventType = (item: Item): item is EventType => {
    return 'date_of_event' in item && 'event_info' in item;
};
