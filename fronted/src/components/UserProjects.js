import React from 'react'
import { useParams} from 'react-router-dom'

// import ProjectItem from "./Projects";


const UserProjectItem = ({project, users}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.users_on_projects.map((userId) => { return users.find((user) => user.id == userId).username}).join(', ')}</td>
        </tr>
    )
};

const UserProjectList = ({projects, users}) => {
    let {id} = useParams();
    let filtered_projects = projects.filter((project) => project.users_on_projects.includes(parseInt(id)));

    return (
        <table>
            <th>
                id
            </th>
            <th>
                name
            </th>
            <th>
                users_on_projects
            </th>
            {filtered_projects.map((project) => <UserProjectItem project={project} users={users}/>)}
        </table>

    )
};

export default UserProjectList