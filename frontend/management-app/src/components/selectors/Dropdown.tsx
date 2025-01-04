
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type DropdownItemsProps = {
  items: string[],
  onChangeEvent: (value: string) => void
}

const Dropdown : React.FC<DropdownItemsProps> = ({items, onChangeEvent} : DropdownItemsProps) => {
  return (
    <Select onValueChange={(value: string) => onChangeEvent(value)}>
      <SelectTrigger className="w-[180px] text-white">
        <SelectValue placeholder="Select goal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Goal</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export default Dropdown;