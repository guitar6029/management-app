import { useReducer, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

type State = {
    selectedSlider: string
}

type ACTION = {
    type: string,
    payload: string
}

type SliderProps = {
    sliderItems: Array<string>,
    onClickEvent?: (eventType: string) => void
}

const Sliders: React.FC<SliderProps> = ({ sliderItems, onClickEvent }) => {
    const initialState: State = {
        selectedSlider: sliderItems[0]
    };

    const reducer = (state: State, action: ACTION): State => {
        switch (action.type) {
            case "SELECT_SLIDER":
                return { ...state, selectedSlider: action.payload }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // Create a debounced version of the onClickEvent callback
    const debouncedOnClickEvent = useRef(debounce(onClickEvent || (() => { }), 300)).current;

    useEffect(() => {
        if (onClickEvent) {
            debouncedOnClickEvent(state.selectedSlider);
        }
    }, [state.selectedSlider, debouncedOnClickEvent]);

    return (
        <div className="grid grid-cols-3 items-center justify-center gap-2 rounded-full bg-[var(--component-base-bg-color)]">
            {sliderItems.map((item, index: number) => (
                <button key={index} onClick={() => dispatch({ type: "SELECT_SLIDER", payload: item })} className={`${state.selectedSlider === item ? "text-black bg-white" : "text-[var(--text-link)]"} rounded-full sm:p-1 md:p-2 lg:p-3 xl:p-4 text-base sm:text-sm md:text-md lg:text-lg  `}>
                    {item}
                </button>
            ))}
        </div>
    );
}

export default Sliders;
