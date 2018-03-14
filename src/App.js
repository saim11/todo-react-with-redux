import React, { Component } from 'react';
import './App.css';
import { addData, getData, updateData, deleteData } from './store/actions/actions';
import { Button, Input, Header, Container, Divider, inverted, Modal, Image } from 'semantic-ui-react'
import { store } from './store/index';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    //This.state always constructed in construction
    this.state = {
      //Initializing state's initial object.
      inputTodo: "",
      todos: []
    }

    this.formHandler = this.formHandler.bind(this);
    this.todosAdd = this.todosAdd.bind(this);
    this.todosUpdate = this.todosUpdate.bind(this);
    this.todosDelete = this.todosDelete.bind(this);
    store.subscribe(() => {
      console.log(store.getState());
    }
    )
    // Getting todos from firebase..
    this.props.getData();
  }


  // Taking input Todo from user and handling ahead..
  formHandler(ev) {
    this.setState({
      inputTodo: ev.target.value
    })
  }
  // Adding todos in firebase
  todosAdd() {
    if (this.state.inputTodo === "") {
      alert("Please enter Todos..!!");
    }
    else {
      this.props.addData({ addTodo: this.state.inputTodo });
      this.setState({
        inputTodo: ""
      })
    }
  }
  // updating todos in firebase
  todosUpdate(ev) {
    let updatedValue = prompt("enter updated Todo", ev.target.value);
    if (updatedValue === null) {
      updatedValue = ev.target.value;
    }
    let userId = ev.target.id;
    this.props.updateData({ id: userId, updatedTodo: updatedValue });
  }
  // Dleting todos in firebase
  todosDelete(ev) {
    let userId = ev.target.id;
    this.props.deleteData({ id: userId });
  }




  render() {
    return (
      <div >
        <Container className="App">
          <Image src='./todo.jpg' centered size='small' circular />
          <h1>My todo Application</h1>
          <Input type="text" fluid icon='write' placeholder="Please add todo..." aria-label="Recipient's username" onChange={this.formHandler} aria-describedby="basic-addon2" value={this.state.inputTodo} />
          <br /><Button type="button" positive onClick={this.todosAdd} >Add Todo</Button>
          <hr />
        </Container>
        <ul>
          {
            this.props.todos !== undefined ? (
              this.props.todos.map((todos, index) => {
                return (
                  <Container key={todos.todo.id} inverted>
                    <Header as="h1">My Todos</Header>
                    <Header as="h4">{todos.todo.addTodo}</Header>
                    <Button style={{ backgroundColor: "blue", color: "white" }} onClick={this.todosUpdate} id={todos.todo.id} value={todos.todo.addTodo}>Update</Button>
                    <Button style={{ backgroundColor: "red", color: "white" }} onClick={this.todosDelete} id={todos.todo.id}>Delete</Button>
                    <Divider />
                  </Container >

                )
              }
              )
            ) : (
                console.log("this.props.todos is undefined")
              )

          }
        </ul>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }


}
function mapDispatchToProps(dispatch) {
  return ({
    addData: (cloneTodosArray) => { dispatch(addData(cloneTodosArray)) },
    getData: () => { dispatch(getData()) },
    updateData: (updatedTodo) => { dispatch(updateData(updatedTodo)) },
    deleteData: (deleteTodo) => { dispatch(deleteData(deleteTodo)) }
  })
}

const connectAppComponent = connect(mapStateToProps, mapDispatchToProps)(App)

export default connectAppComponent;
