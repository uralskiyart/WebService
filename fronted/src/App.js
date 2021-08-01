import React from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import UserProjectList from "./components/UserProjects";
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import TodoList from "./components/Todo";

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
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} users={this.state.users} />} />
                     <Route exact path='/todo_notes' component={() => <TodoList todo_notes={this.state.todo_notes} users={this.state.users} />} />
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

