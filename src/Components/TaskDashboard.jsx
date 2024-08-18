import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../config';
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
const TaskDashboard = () => {
    const [task, settask] = useState('');
    const [taskList, settaskList] = useState([]);
    const navigate = useNavigate();
    const [taskId, setTaskId] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))

    // function to retieve data from server
    const fetchTasks = async () => {
        const token = localStorage.getItem('token')
        if (!user) {
            navigate('/login')
        }
        const response = await axios.get(`${API_URL}/tasks/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        settaskList(response.data.task);
    };
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        fetchTasks();
    }, []);


    // function to add data to server send by user
    const handleAddTask = async () => {
        const token = localStorage.getItem('token')
        if (!user) {
            navigate('/login')
        }
        if (task !== "") {
            await axios.post(`${API_URL}/tasks/${user.id}`, { task: task }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            settask('');
            // fetchTasks();
        }
    };

    // function to delete data 
    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${API_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Task Deleted Successfully')
            fetchTasks()
        } catch (error) {
            alert("Error Deleting task", error)
        }
        // fetchTasks();
    };

    const handleUpdateTask = async () => {
        const token = localStorage.getItem('token')
        if (!user) {
            navigate('/login')
        }
        try {
            if (task !== "") {
                await axios.put(`${API_URL}/tasks/${taskId}`, { task: task }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("Task Updated")
                fetchTasks();
            }
        } catch (error) {
            alert("Error updatin task", error)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <div className='vh-100 bg-secondary'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bold" >Dashboard</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="ms-auto me-3">
                            <button className="btn btn-secondary" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='text-center'>
                <h1 className='h1'>To Do List App</h1>
                <div className='div'>
                    <form onSubmit={handleAddTask}>
                        <label htmlFor='inputTask' className='label'>Enter the Task : </label>
                        <input type="text" value={task} onChange={e => settask(e.target.value)} id="inputTask" className='task' />
                        <button type='submit' className='button'>Add Task</button>
                    </form>
                </div>
                <ul className='ul mt-5'>
                    {taskList.length > 0 ? (taskList.map((Task, index) =>
                        <li className='li d-flex align-items-center' key={Task.id}>
                            <span className='me-1 mb-auto mt-auto' >{index + 1}.</span>
                            <span className='dtask'>
                                {Task.task}
                            </span>
                            <div className='d-flex'>
                                <div>
                                    <button type="button" class="dbutton btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e => setTaskId(Task.id)}>
                                        Edit
                                    </button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update Task</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form onSubmit={handleUpdateTask}>
                                                    <div class="modal-body" style={{ fontSize: "18px" }}>
                                                        <label htmlFor="task" className='me-2 fw-normal fs-0'>Task :</label>
                                                        <input type="text" className='ps-2' id='task' value={task} onChange={e => settask(e.target.value)} />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteTask(Task.id)} className='dbutton btn btn-danger'>Delete</button>
                            </div>
                        </li>
                    )
                    ) : (
                        null
                    )}
                </ul>
            </div>
        </div>
    )
}

export default TaskDashboard

