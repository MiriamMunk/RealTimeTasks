import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TaskTableRow from '../Components/TaskTableRow';
import { HubConnectionBuilder } from '@microsoft/signalr';

const HomePage = () => {

    const [tasks, setTasks] = useState([])
    const [taskTitle, setTaskTitle] = useState('');
    const connectionRef = useRef(null);

    useEffect(() => {
        const getTasks = async () => {
            const connection = new HubConnectionBuilder().withUrl("/task").build();
            await connection.start();
            connectionRef.current = connection;
          
            connection.on('getTasks', tasks => {
                setTasks(tasks);
            });

            await axios.get('/api/task/getTasks');

        }
        getTasks();
    }, [])

    const onAddTaskClick = async () => {
        await axios.post('/api/task/addTask', { Title: taskTitle });
        setTaskTitle('');
    }

    const takeTask = async task => {
        await axios.post('/api/task/startTask', task);
    }
    const taskCompleted = async task => {
        await axios.post('/api/task/taskCompleted', task);
    }

    return (<div className="container">
        <div className="row">
            <div className="col-md-10">
                <input type="text" className="form-control" placeholder="Task Title" onChange={e => setTaskTitle(e.target.value)} value={taskTitle} />
            </div>
            <div className="col-md-2">
                <button className="btn btn-primary btn-block" onClick={onAddTaskClick}>Add Task</button>
            </div>
        </div>
        <table className="table table-striped table-bordered mt-5">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((t, k) => <TaskTableRow
                    key={k}
                    task={t}
                    onTakeTaskClick={() => takeTask(t)}
                    onCompletedClick={() => taskCompleted(t)}
                />)}
            </tbody>
        </table>
    </div>)
}
export default HomePage;