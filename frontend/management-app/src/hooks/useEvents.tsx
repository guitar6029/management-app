import { useEffect, useReducer } from "react";
import { getEvents } from "../api/events/events-api";

const initialState: State = {
    events: []
}

type Event = {
    id: number,
    description: string,
    date_of_event: string,
    mandatory: boolean,
    event_info: string,
}
type State = {
    events: Event[]
}

type SET_EVENTS_ACTION = {
    type: "SET_EVENTS";
    payload: Event[];
}

type Action = SET_EVENTS_ACTION;

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_EVENTS":
            return { ...state, events: action.payload };
        default:
            return state;
    }
}

const useEvents = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //get the response from the api
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;


        const getEventsDataHelper = async () => {
            try {
                const response = await getEvents(signal);
                if (response) {
                    dispatch({ type: "SET_EVENTS", payload: response })
                }
            } catch (error) {
                console.log(error);
            }
        }


        getEventsDataHelper()


        // clean up
        return () => {
            controller.abort();
        }


    }, [])


    return state

};

export const eventListIsEmpty = (state: State) => state.events.length === 0


export default useEvents