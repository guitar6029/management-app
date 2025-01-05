import { Item, EventType, GeneralItem, DepartmentItem , Employee} from '../../types/types';
import { MarketingItem } from '../../types/types';

type InfoPanelProps = {
    item: Item | MarketingItem | DepartmentItem | Employee;
    category: string;
    currentItem?: DepartmentItem;
    onClick?: (item: Item | MarketingItem | DepartmentItem) => void;
};

const InfoPanel: React.FC<InfoPanelProps> = ({ item, category, onClick, currentItem }: InfoPanelProps) => {
    if (category === 'events') {
        const eventItem = item as EventType;  // Explicitly cast to EventType
        return (
            <div onClick={() => onClick && onClick(item)} style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }} className="cursor-pointer rounded-lg grid grid-cols-4 gap-7 hover:bg-[var(--text-link)] transition duration-200 ease-in text-white hover:text-black p-2">
                <span className="font-semibold">{eventItem.date_of_event.toLocaleDateString()}</span>
                <span className="font-semibold truncate">{eventItem.description}</span>
                <span className="font-semibold">{eventItem.mandatory ? 'Mandatory' : 'Optional'}</span>
                <span className="font-semibold truncate">{eventItem.event_info}</span>
            </div>
        );
    } else if (category === 'general') {
        const generalItem = item as GeneralItem;  // Explicitly cast to GeneralItem
        return (
            <div onClick={() => onClick && onClick(item)} className="flex flex-row items-center gap-2">
                <span>{generalItem.name}</span>
                {/* <span>{generalItem.date}</span> */}
                <span>{generalItem.description}</span>
            </div>
        );
    } else if (category === 'marketing') {
        const marketingItem = item as MarketingItem;  // Explicitly cast to MarketingItem
        return (
            <div onClick={() => onClick && onClick(item)} style={{ gridTemplateColumns: "1fr auto 1fr 1fr" }} className="cursor-pointer rounded-lg grid grid-cols-4 items-center gap-7 hover:bg-[var(--text-link)] transition duration-200 ease-in text-white hover:text-black p-2">
                <span className="font-semibold truncate">{marketingItem.campaign_name}</span>
                <span className="font-semibold">{marketingItem.status}</span>
                <span className="font-semibold truncate">{marketingItem.goals}</span>
                <span className="font-semibold truncate">{marketingItem.target_audience}</span>
            </div>
        );
    } else if (category === 'department') {
        const departmentItem = item as DepartmentItem;  // Explicitly cast to Department

        return (
            <div onClick={() => onClick && onClick(item)} style={{ gridTemplateColumns: "1fr" }} className={`${currentItem && currentItem === departmentItem.id ? "bg-[var(--primary-bar-item-color)] text-black" : ""}  cursor-pointer rounded-lg grid grid-cols-4 items-center gap-7  hover:bg-[var(--text-link)] transition duration-200 ease-in text-white hover:text-black p-2`} >
                <span className="font-semibold">{departmentItem.name}</span>
            </div>
        )
    } else if (category === 'employees') {
        const employeeItem = item as Employee;  // Explicitly cast to EventType
        return (
            <div style={{ gridTemplateColumns: "1fr 1fr" }} onClick={() => onClick && onClick(item)} className="grid grid-cols-4 items-center">
                <span className="font-semibold text-white">{employeeItem.name}</span>
                <span className="font-semibold text-white ">{employeeItem.position}</span>
            </div>
        );
    }

};

export default InfoPanel;
