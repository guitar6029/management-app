import React, { useReducer, useState } from "react";
import { Trash2 } from 'lucide-react';

const initialState = {
    brainStorm: ['Plan Meeting', 'Plan Project', 'Plan Task'],
    planned: ['Review PR', 'Schedule Meeting'],
    current: ['Talk with team', 'Focus on project'],
    completed: ['Push to production', 'Talk with Ui/UX team'],
    editingTask: null
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'DELETE_TASK': {
            const { column, task } = action.payload;
            return { ...state, [column]: state[column].filter((item: string) => item !== task) };
        }
        case 'MOVE_TASK': {
            const { from, to, task } = action.payload;
            if (from === to) {
                return state;
            }
            return {
                ...state,
                [from]: state[from].filter((item: string) => item !== task),
                [to]: [...state[to], task]
            };
        }
        case 'ADD_TASK':
            return { ...state, brainStorm: [...state.brainStorm, action.payload] };
        case 'START_EDITING':
            return { ...state, editingTask: { column: action.payload.column, task: action.payload.task } };
        case 'SAVE_EDIT': {
            const { column, oldTask, newTask } = action.payload;
            return {
                ...state,
                [column]: state[column].map((task: string) => task === oldTask ? newTask : task),
                editingTask: null
            };
        }
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
                    className="col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-1 xl:col-span-1 flex flex-col sm:flex-row md:flex-row lg:flex-col xl:flex-col gap-4 h-[400px] sm:h-auto overflow-y-auto"
                >
                    <div className="flex justify-between md:gap-4 items-center sm:w-[170px]  sm:flex-col sm:items-start sm:justify-start lg:flex-row md:justify-between md:items-center">
                        <span className="text-white font-bold capitalize text-2xl">{column}</span>
                        <div className="flex flex-row gap-2">
                            <span className="text-white font-bold">Total </span>
                            <span className="flex items-center justify-center text-black w-[25px] h-[25px] bg-white p-2 rounded-full font-bold text-lg">{state[column].length}</span>
                        </div>
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
                                
                                <div className="flex min-h-full flex-col justify-between">
                                    <span>{task}</span>
                                    <Trash2 onClick={() => dispatch({ type: 'DELETE_TASK', payload: { column, task } })} size={40} className="cursor-pointer p-2 hover:bg-white rounded-full transition duration-200 ease-in hover:fill-black " />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaskManager;
