import { useReducer, useEffect } from "react";
import { getDepartments } from "../api/department/department-api";

const initialState = {
    departments: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEPARTMENTS':
            return { ...state, departments: action.payload }
        default:
            return state    
    }
}


const useDepartments = () => {

    const [ state, dispatch] = useReducer(reducer, initialState) 


    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;


        const getDepartmentHelper = async () => {
            try {
                const response = await getDepartments(signal);
                if (response) {
                    dispatch(({type: 'SET_DEPARTMENTS', payload: response}))
                }
            } catch (error) {
                console.log(error);
            }
        }


        getDepartmentHelper()

        return () => {
            controller.abort();
        }

    }, [])

    return state

}

export default useDepartments;