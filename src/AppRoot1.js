import React, { Component } from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';//createStore track data in store what changes in store

// Reducer

//  "Reducer" Aik function huta jismei action ki types match huti hyn and switch ya if k through us particular action ka operation perform huta hai..
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'Add_Todo':
      return [...state, action.todo];
    case 'Edit_Todo':
      let indexValue;
      state.forEach((item, index) => {
        indexValue = action.todo.id === item.id ? index : -1;
        if (indexValue > 0) {
          [...state][indexValue].todoValue = action.todo.editTodo;
        }
      });
      return state = [...state];
    case 'Remove_Todo':
      return state.filter((todo) => {
        return todo.id !== action.id;
      });
    case 'Remove_All':
      return state = []
    default:
      state = [...state];
  }

}



// Store

const store = createStore(todoReducer);
store.subscribe(() => {
  console.log(store.getState());
})

//********************************** Actions

//  "Action" Aik function huta hy jo only object return krta hai

const addTodo = ({ id, todoValue }) => ({
  type: "Add_Todo",
  todo: {
    id,
    todoValue
  }
})
const editTodo = ({ id, editTodo }) => ({
  type: "Edit_Todo",
  todo: {
    id,
    editTodo
  }
})
const removeTodo = ({ id }) => ({
  type: "Remove_Todo",
  id
})
const removeAll = () => ({
  type: "Remove_All",
})

// Action's arguements always passed in dispatch 

//************* Add todos
store.dispatch(addTodo({ id: "srysjryeuyuer4577vgf", todoValue: "Everything has end time.!!" }));
store.dispatch(addTodo({ id: "srysjryeu5uyuygtgvgyrdyt577vgf", todoValue: "Ali has secured A+ in his Final semester..!!" }));
store.dispatch(addTodo({ id: "sr665vthfdgtyg6y6dfgfdyfdgy6ty", todoValue: "Kashif has secured A+ in his Final semester..!!" }));
// **************Edit todos
// store.dispatch(editTodo({ id: "sr665vthfdgtyg6y6dfgfdyfdgy6ty", editTodo: "Saleem has secured A+ in his Final semester ..!!" }));
//******** Remove specific todo from todos
// store.dispatch(removeTodo({ id: "sr665vthfdgtyg6y6dfgfdyfdgy6ty" }));
//********** Remove All todos
// store.dispatch(removeAll());





class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
