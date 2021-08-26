import React from "react";


class ProjectForm extends React.Component {
     constructor(proops) {
         super(proops)
         this.state = {
             'name': '',
             'users_on_project': []
         }
     }

     handleChange(event) {
         this.setState({
             [event.target.name] : event.target.value
         })
     }

      handleUserChange(event) {
          if (!event.target.selectedOptions) {
              this.setState({
                  'users_on_project': []
              })
              return;
          }
          let users = []
          for(let i=0; i < event.target.selectedOptions.length; i++){
              users.push(event.target.selectedOptions.item(i).value)
          }

         this.setState({
             'users_on_project' : users
         })
     }

     handleSubmit(event) {
         this.props.createProject(this.state.name, this.state.users_on_project)
         event.preventDefault();

     }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            <select multiple name="users_on_project" onChange={(event)=>this.handleUserChange(event)}>
                {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
            </select>
            <input type="submit" value="Create" />
        </form>
      );
    }

};


export default ProjectForm;