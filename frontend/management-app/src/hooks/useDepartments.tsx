import { useReducer, useEffect } from "react";
import { getDepartments, getEmplyeesListByDepartment } from "../api/department/department-api";
import { DepartmentItem , Employee} from "@/types/types";

interface DepartmentState {
    departments: DepartmentItem[],
    departmentName: string,
    selectedDepartment: number,
    listOfEmployees: Employee[]
}

type DepartmentAction =
    | { type: 'SET_DEPARTMENTS', payload: DepartmentItem[] }
    | { type: 'SELECT_DEPARTMENT', payload: number }
    | { type: 'SET_DEPARTMENT_NAME', payload: string }
    | { type: 'SET_LIST_OF_EMPLOYEES', payload: Employee[] }


const initialState = {
    departments: [] as DepartmentItem[],
    departmentName: "HR",
    selectedDepartment: 1,
    listOfEmployees: []
}

const reducer = (state: DepartmentState, action: DepartmentAction) => {
    switch (action.type) {
        case 'SET_DEPARTMENTS':
            return { ...state, departments: action.payload }
        case 'SELECT_DEPARTMENT':
            return { ...state, selectedDepartment: action.payload }
        case 'SET_DEPARTMENT_NAME':
            return { ...state, departmentName: action.payload }
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
    const setDepartment = (department: { id: number; name: string; }) => {
        dispatch({ type: "SET_DEPARTMENT_NAME", payload: department.name });
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

export const isDepartmentListEmpty = (state: { departments: DepartmentItem[] }) => state.departments.length === 0;

export default useDepartments;