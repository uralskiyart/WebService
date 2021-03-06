import React from 'react'

const ProjectItem = ({project, users, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository_link}</td>
            <td>{project.users_on_projects.map((userId) => { return users.find((user) => user.id === userId).username}).join(', ')}</td>
            <td><button onClick={() => deleteProject(project.id)} type='<button>'>Delete</button></td>
        </tr>
    )
};

const ProjectList = ({projects, users, deleteProject}) => {
    return (
        <table>
            <th>
                id
            </th>
            <th>
                name
            </th>
            <th>
                repository_link
            </th>
             <th>
                users_on_projects
            </th>
            {projects.map((project) => <ProjectItem project={project} users={users} deleteProject={deleteProject}/>)}
        </table>

    )
};

export default ProjectList