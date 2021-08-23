import React from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users';
import ProjectList from './components/Projects';
import UserProjectList from './components/UserProjects';
import LoginForm from './components/LoginForm';
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import TodoList from "./components/Todo";
import Cookies from 'universal-cookie';

const Page404 = ({location}) => {
    return <div>
        Page {location.pathname} not found
    </div>
}

class App extends React.Component {
    constructor(proops) {
        super(proops)
        this.state = {
            'users': [],
            'projects': [],
            'todo_notes': [],
            'token': ''
        }
    }

    is_auth() {
        return !!this.state.token
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        this.setState({'token': cookies.get('token')}, this.get_data)
    }

    get_headers() {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json version=2.0'
        }
        const cookie = new Cookies()
        header['Authorization'] = 'Token' + cookie.get('token')
        return header;
    }

    get_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(
                response => {
                    const users = response.data.results
                    this.setState({
                        'users': users
                    })
                }
            ).catch(
             error => {
                 this.setState({
                     'users': []
                 })
                 console.log(error)
             }
        )

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(
                response => {
                    const projects = response.data.results
                    this.setState({
                        'projects': projects
                    })
                }
            ).catch(
             error => {
                 this.setState({
                     'projects': []
                 })
                 console.log(error)
             }
        )

        //  axios.get('http://127.0.0.1:8000/api/graphql', {headers})
        //     .then(
        //         response => {
        //             const projects = response.data.results
        //             this.setState({
        //                 'projects': projects
        //             })
        //         }
        //     ).catch(
        //      error => {
        //          this.setState({
        //              'projects': []
        //          })
        //          console.log(error)
        //      }
        // )

        axios.get('http://127.0.0.1:8000/api/todo_notes/', {headers})
            .then(
                response => {
                    const todo_notes = response.data.results
                    this.setState({
                        'todo_notes': todo_notes
                    })
                }
            ).catch(
            error => {
                 this.setState({
                     'todo_notes': []
                 })
                 console.log(error)
            }
        )
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            'username': login,
            'password': password
        })
            .then(
                response => {
                    const cookie = new Cookies()
                    cookie.set('token', response.data.token)
                    this.setState({'token': response.data.token}, this.get_data)


                    // localStorage.setItem('token', response.data.token)
                }
            ).catch(
            error => console.log(error)
        )
    }

    logout() {
        const cookie = new Cookies()
        cookie.set('token', '')
        this.setState({'token': ''}, this.get_data)
    }

    componentDidMount() {
        this.get_token_from_storage()
    }


    render() {
        return (
            <div>
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todo_notes'>Todo notes</Link>
                            </li>
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link> }
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                    users={this.state.users}/>}/>
                        <Route exact path='/todo_notes' component={() => <TodoList todo_notes={this.state.todo_notes}
                                                                                   users={this.state.users}/>}/>
                        <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
                        <Route path='/user/:id' component={() => <UserProjectList projects={this.state.projects}
                                                                                  users={this.state.users}/>}/>
                        <Redirect from='/users' to='/'/>
                        <Route component={Page404}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    };
};

export default App;

