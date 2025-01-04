import useDepartments from "@/hooks/useDepartments";

const Departments = () => {

    const { state } = useDepartments();

    return ( 
        <div>
            <span>Departments</span>
        </div>
     );
}
 
export default Departments;