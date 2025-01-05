import TaskManager from "@/components/Tasks/TaskManager";

const Tools: React.FC = () => {
    return (
        <div className="min-h-screen flex-col gap-4">
            <section className="sm:col-span-2">
                <TaskManager />
            </section>
        </div>
    );
}

export default Tools;