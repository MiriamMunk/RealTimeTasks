import React from 'react';
import { useUserContext } from '../UserContext';

const TaskTableRow = ({ task, onTakeTaskClick, onCompletedClick }) => {

    const { title, userId } = task;
    const { user } = useUserContext();

    const CurrentUser = userId === user.id;
    const DifferentUser = userId !== user.id;


    return <tr>
        <td>{title}</td>
        <td>
            {userId ? <> {!!CurrentUser && < button className="btn btn-success" onClick={onCompletedClick} > I'm done! </button>}
                {!!DifferentUser && < button disabled className="btn btn-warning" >{task.user.firstName} {task.user.lastName} is doing this</button>}</>
                :
                < button className="btn btn-info" onClick={onTakeTaskClick} > I'm doing this one!</button>}
        </td>
    </tr>
}
export default TaskTableRow;