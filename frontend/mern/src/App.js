import React, { Component } from 'react'

import axios from 'axios';




const API_URL = `http://localhost:3008/employees` // fetch all employee - p -

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],
      showUpdateForm: false,
      employeeId: '', // employee to be updated

    }
  }

  // to run when after app's first render
  componentDidMount() {
    this.fetchEmployees()
  }

  // fetch all employees
  async fetchEmployees() {
    try {
      const response = await axios.get(API_URL); 
      this.setState({ employees: response.data });
    } catch (error) {
      console.error(error);
    }
  }

// what happens after form is submitted
  handleCreateForm = (event) => {
    event.preventDefault();
    // create an object with the required fields for our model
    const newInfo = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
    }
    this.handleCreate(newInfo); // pass this into our create function!
  }

  handleUpdateForm = (id) => {
 
    this.setState({showUpdateForm: true, employeeId: id});
  }

  submitUpdate = async (event) => {
  
    // create an object with the required fields for our model
    const newInfo = {
      firstname: event.target.updatefirst.value,
      lastname: event.target.updatelast.value,
    }

    const URL = `http://localhost:3008/employee/update/${this.state.employeeId}`;


  
      const response = await axios.put(URL, newInfo); // put == update
      // console.log(response.data);
       const updatedEmployee = this.state.employees.map(employee => {
        if (employee._id === response.data._id){
           return response.data;
        }else{
          return employee
        }
      });
      
      this.setState({employees: updatedEmployee}); 
       
      
  }

  handleDelete = async (employeeDelete) => {

    const url = `http://localhost:3008/employee/${employeeDelete}`; // finds the ObjectID for us :0
    console.log(employeeDelete);
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      const filteredOut = this.state.employees.filter(employee => employee._id !== employeeDelete);
      this.setState({employees: filteredOut}); // auto rerender
    } catch (error) {
      console.log(error);
    }
  }


  handleCreate = async (info) => {
    // we need to access our route to the post method.
    const URL = `http://localhost:3008/new-employee`;
    // our fist param is the URL, second is the JSON body!
    const response = await axios.post(URL, info);
    // this is the data we need to set the state with our new post
    const newEmployee = response.data;
    this.setState({
      employee: [...this.state.employees, newEmployee]
    }, () => this.fetchEmployees()); // running a callback after the state is updated. takes a while ;)
  }
  render() {
    const { employees, showUpdateForm } = this.state;
    return (
      <>
        List of employees below:
        {/* cat._id */}
        {employees !== null ? employees.map(employee => {
          return (
            <div key={employee._id}>
              <h1>{employee.firstname}</h1>
              <button onClick={() => this.handleDelete(employee._id)}>Delete</button>
              <button onClick={() => this.handleUpdateForm(employee._id)}>Update</button>
            </div>
          )
        }) : null}

        <form onSubmit={this.handleCreateForm}>
          <input type='name' name="firstname" />
          <input type='name' name="lastname" />
          <button type='submit'>Submit</button>

        </form>
        {showUpdateForm ? (
          <>
          <h1>Update Here!</h1>
          <form onSubmit={this.submitUpdate}>
            <input type='name' name='updatefirst'/>
            <input type='name' name='updatelast'/>
            <button type='submit'>Confirm Update</button>
          </form>
          </>
        ) : null }
      </>
    )
  }
}

