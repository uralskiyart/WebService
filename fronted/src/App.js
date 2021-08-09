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
    }
  }

  componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(
                response => {
                  const users = response.data.results
                  this.setState({
                    'users': users
                  })
                }
            ).catch(
                error => console.log(error)
        )

          axios.get('http://127.0.0.1:8000/api/projects/')
            .then(
                response => {
                  const projects = response.data.results
                  this.setState({
                    'projects': projects
                  })
                }
            ).catch(
                error => console.log(error)
        )

      axios.get('http://127.0.0.1:8000/api/todo_notes/')
            .then(
                response => {
                  const todo_notes = response.data.results
                  this.setState({
                    'todo_notes': todo_notes
                  })
                }
            ).catch(
                error => console.log(error)
        )
  };

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            'username': login,
            'password': password
        })
            .then(
                response => {
                    const cookie = new Cookies()
                    cookie.set('token', response.data.token)
                    console.log(cookie.get('token'))
                    // localStorage.setItem('token', response.data.token)
                }
            ).catch(
                error => console.log(error)
        )
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
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} users={this.state.users} />} />
                    <Route exact path='/todo_notes' component={() => <TodoList todo_notes={this.state.todo_notes} users={this.state.users} />} />
                    <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)}/>} />
                    <Route path='/user/:id' component={() => <UserProjectList projects={this.state.projects} users={this.state.users}/>} />
                    <Redirect from='/users' to='/' />
                    <Route component={Page404} />
                </Switch>
            </HashRouter>
        </div>
    )
  };
};

export default App;

