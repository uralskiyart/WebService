import React from 'react'

const TodoItem = ({todo_note, users}) => {
    return (
        <tr>
            <td>{todo_note.id}</td>
            <td>{todo_note.project_name}</td>
            <td>{todo_note.is_active}</td>
            <td>{todo_note.authors.map((userId) => { return users.find((user) => user.id == userId).username}).join(', ')}</td>
        </tr>
    )
};

const TodoList = ({todo_notes, users}) => {
    return (
        <table>
            <th>
                id
            </th>
            <th>
                project_name
            </th>
            <th>
                is_active
            </th>
             <th>
                authors
            </th>
            {todo_notes.map((todo_note) => <TodoItem todo_note={todo_note} users={users}/>)}
        </table>

    )
};

export default TodoList