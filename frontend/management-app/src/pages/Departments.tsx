import useDepartments from "@/hooks/useDepartments";
import InfoPanel from "@/components/Panels/infoPanel";
import { DepartmentItem } from "@/types/types";

const Departments = () => {
    const { state, setDepartment, listOfEmployees } = useDepartments();
    document.title = "Management | Departments";

    return (
        <div className="p-4 grid grid-cols-2 sm:flex-row gap-4">

            <section className="flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-col gap-2">
                    <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Departments</h3>
                    <h6 className="text-[var(--secondary-text-color)] text-base sm:text-lg font-medium">Select department</h6>
                </div>
                <div className="overflow-y-auto flex flex-col gap-2 max-h-screen">
                    {state.departments && state.departments.map((department: DepartmentItem) => {
                        return (
                            <InfoPanel currentItem={state.selectedDepartment} key={department.id} item={department} category="department" onClick={(department) => setDepartment(department)} />
                        )
                    })}

                </div>
            </section>


            <section className="flex flex-col w-1/2 sm:w-full gap-6 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-col gap-2">
                    <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">{state.departmentName}</h3>
                    <h6 className="text-[var(--secondary-text-color)] text-base sm:text-lg font-medium">List of current employees</h6>
                    <hr />
                </div>
                <div className="overflow-y-auto flex flex-col gap-2 max-h-screen">
                    {listOfEmployees && listOfEmployees.map((employee: any) => {
                        return (
                            <InfoPanel key={employee.id} item={employee} category="employees" />
                        )
                    })}
                </div>
            </section>
        </div>
    );
}

export default Departments;