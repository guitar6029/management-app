import React, { useReducer, useState } from "react";

const initialState = {
    brainStorm: ['Do something 1', 'Do Something 2'],
    planned: ['Planned 1', 'Planned 2'],
    current: ['Current 1', 'Current 2'],
    completed: ['Completed 1', 'Completed 2'],
    editingTask: null
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'MOVE_TASK':
            const { from, to, task } = action.payload;
            if (from === to) {
                return state;
            }
            return {
                ...state,
                [from]: state[from].filter((item: string) => item !== task),
                [to]: [...state[to], task]
            };
        case 'ADD_TASK':
            return { ...state, brainStorm: [...state.brainStorm, action.payload] };
        case 'START_EDITING':
            return { ...state, editingTask: { column: action.payload.column, task: action.payload.task } };
        case 'SAVE_EDIT':
            const { column, oldTask, newTask } = action.payload;
            return {
                ...state,
                [column]: state[column].map((task: string) => task === oldTask ? newTask : task),
                editingTask: null
            };
        default:
            return state;
    }
};

const TaskManager = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [newTaskText, setNewTaskText] = useState("");

    const styleTaskContainer = {
        border: '.5px solid var(--secondary-text-color)',
        borderRadius: '5px',
        padding: '10px',
        margin: '5px',
        width: '200px',
        height: '200px',
        color: 'white',
        boxShadow: '0 7px 7px var(--card-shadow)',
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: string, from: string) => {
        e.dataTransfer.setData('task', task);
        e.dataTransfer.setData('from', from);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, to: string) => {
        e.preventDefault();
        const task = e.dataTransfer.getData('task');
        const from = e.dataTransfer.getData('from');
        dispatch({ type: 'MOVE_TASK', payload: { from, to, task } });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleTaskClick = (column: string, task: string) => {
        dispatch({ type: 'START_EDITING', payload: { column, task } });
        setNewTaskText(task);
    };

    const handleSaveEdit = () => {
        const { column, task: oldTask } = state.editingTask;
        dispatch({ type: 'SAVE_EDIT', payload: { column, oldTask, newTask: newTaskText } });
    };

    return (
        <div className="grid grid-cols-4 gap-10 bg-[var(--component-base-bg-color)] rounded-lg p-4">
            <div className="col-span-4">
                <div className="flex flex-row justify-between">
                    <h1 className="text-white font-bold text-2xl">Task Manager</h1>
                    <button
                        className="w-[200px] text-[var(--primary-text-color)] font-semibold bg-white rounded-lg text-xl p-2"
                        onClick={() => dispatch({ type: 'ADD_TASK', payload: `Task ${state.brainStorm.length + 1}` })}
                    >
                        + Add Task
                    </button>
                </div>
            </div>

            {['brainStorm', 'planned', 'current', 'completed'].map((column) => (
                <div
                    key={column}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column)}
                    className="flex flex-col gap-4 h-[400px] sm:h-auto  overflow-y-auto"
                >
                    <div className="flex justify-center items-center">
                        <span className="text-white font-bold capitalize text-2xl">{column}</span>
                    </div>
                    {state[column].map((task: string, index: number) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task, column)}
                            style={styleTaskContainer}
                            onClick={() => handleTaskClick(column, task)}
                            className="cursor-pointer hover:scale-105 transition duration-200 ease-out"
                        >
                            {state.editingTask && state.editingTask.column === column && state.editingTask.task === task ? (
                                <input
                                    type="text"
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    onBlur={handleSaveEdit}
                                    className="p-2 rounded-lg text-black border border-gray-300 w-full"
                                    autoFocus
                                />
                            ) : (
                                <span>{task}</span>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaskManager;
