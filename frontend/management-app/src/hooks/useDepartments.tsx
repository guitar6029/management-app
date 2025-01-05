import { useReducer, useEffect } from "react";
import { getDepartments, getEmplyeesListByDepartment } from "../api/department/department-api";
import { DepartmentItem } from "@/types/types";

const initialState = {
    departments: [],
    selectedDepartment: "",
    listOfEmployees: []
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DEPARTMENTS':
            return { ...state, departments: action.payload }
        case 'SELECT_DEPARTMENT':
            return { ...state, selectedDepartment: action.payload }
        case 'SET_LIST_OF_EMPLOYEES':
            return { ...state, listOfEmployees: action.payload }
        default:
            return state
    }
}


const useDepartments = () => {

    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        const getDepartmentHelper = async () => {
            try {
                const response = await getDepartments(signal);
                if (response) {
                    dispatch(({ type: 'SET_DEPARTMENTS', payload: response }))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDepartmentHelper();
        return () => {
            controller.abort();
        }
    }, []);

    //fix this change the type
    const setDepartment = (department: any) => {
        dispatch({ type: 'SELECT_DEPARTMENT', payload: department.id })
    }

    //get list of employees by department
    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        const getEmployeesByDepartmentHelper = async () => {
            try {
                const response = await getEmplyeesListByDepartment(state.selectedDepartment, signal);
                if (response) {
                    dispatch({ type: 'SET_LIST_OF_EMPLOYEES', payload: response })
                } 
            } catch (error) {
                console.log(error);
            }

        }
        
        getEmployeesByDepartmentHelper();

        return () => {
            controller.abort();
        }



    }, [state.selectedDepartment])



    return { state, setDepartment , listOfEmployees: state.listOfEmployees}

}

export const isDepartmentListEmpty = (state: any) => state.departments.length === 0;

export default useDepartments;