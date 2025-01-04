import useDepartments from "@/hooks/useDepartments";
import InfoPanel from "@/components/Panels/infoPanel";
import { DepartmentItem } from "@/types/types";

const Departments = () => {
    const { state } = useDepartments();
    document.title = "Management | Departments";
    return (
        <div className="min-h-screen p-4 grid grid-cols-2 sm:flex-row gap-4">
            <section className="flex flex-col w-1/2 sm:w-full gap-2 bg-[var(--component-base-bg-color)] p-4 rounded-lg">
                <div className="flex flex-row items-center">
                    <h3 className="text-base text-white sm:text-xl md:text-2xl font-bold">Departments</h3>
                </div>
                <div className="overflow-y-auto flex flex-col gap-2 max-h-screen">
                    {state.departments && state.departments.map((department: DepartmentItem) => {
                        return (
                            <InfoPanel key={department.id} item={department} category="department" />
                        )
                    })}

                </div>
              
            </section>

            
            <section>
                <span className="text-white">Test</span>
            </section>
           
        </div>
    );
}

export default Departments;