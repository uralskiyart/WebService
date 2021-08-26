import React from 'react'
import {Link} from "react-router-dom";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td><Link to={`user/${user.id}`}>{user.username}</Link></td>
            <td>{user.email}</td>
        </tr>
    )
};

const UserList = ({users}) => {
    return (
        <table>
            <th>
                id
            </th>
            <th>
                username
            </th>
            <th>
                email
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>

    )
};

export default UserList