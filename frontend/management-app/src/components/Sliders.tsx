import { useReducer } from "react";

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

// Move the reducer function inside the Sliders component to have access to onClickEvent
const Sliders: React.FC<SliderProps> = ({ sliderItems, onClickEvent}) => {
    const initialState: State = {
        selectedSlider: sliderItems[0]
    };

    const reducer = (state: State, action: ACTION): State => {
        switch (action.type) {
            case "SELECT_SLIDER":
                if (onClickEvent) {
                    onClickEvent(action.payload);
                }
                return { ...state, selectedSlider: action.payload }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="grid grid-cols-3 items-center justify-center gap-2 rounded-full bg-[var(--component-base-bg-color)]">
            {sliderItems.map((item, index: number) => (
                <button key={index} onClick={() => dispatch({ type: "SELECT_SLIDER", payload: item })} className={`${state.selectedSlider === item ? "text-black bg-white" : "text-[var(--text-link)]"} rounded-full p-4`}>
                    {item}
                </button>
            ))}
        </div>
    );
}

export default Sliders;
