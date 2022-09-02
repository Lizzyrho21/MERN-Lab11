import React, { Component } from 'react'

import axios from 'axios';




const API_URL = `http://localhost:3008/employees` // fetch all employee - p -

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],

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


  handleCreateForm = (event) => {
    event.preventDefault();
    const newInfo = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
    }
    this.handleCreate(newInfo);
  }

  handleDelete = async (employeeDelete) => {

    const url = `http://localhost:3008/employee/${employeeDelete}`; // finds the ObjectID for us :0
console.log(employeeDelete);
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      const filteredOut = this.state.employees.filter(employee => employee._id !== employeeDelete);
      this.setState({employees: filteredOut});
    } catch (error) {
      console.log(error);
    }
  }

  handleCreate = async (info) => {
    const URL = `http://localhost:3008/new-employee`;
    const response = await axios.post(URL, info);
    const newEmployee = response.data;
    this.setState({
      employee: [...this.state.employees, newEmployee]
    }, () => this.fetchEmployees());
  }
  render() {
    const { employees } = this.state;
    return (
      <>
        List of employees below:
        {employees !== null ? employees.map(employee => {
          return (
            <div key={employee._id}>
              <h1>{employee.firstname}</h1>
              <button onClick={() => this.handleDelete(employee._id)}>Delete</button>
            </div>
          )
        }) : null}

        <form onSubmit={this.handleCreateForm}>
          <input type='name' name="firstname" />
          <input type='name' name="lastname" />
          <button type='submit'>Submit</button>

        </form>
      </>
    )
  }
}

