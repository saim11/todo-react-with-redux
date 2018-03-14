import React, { Component } from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';//createStore track data in store what changes in store

// Reducer



const counterReducer = (state = { count: 10 }, action) => {//First parameter is state and 2nd is action..
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      }
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      }
    default:
      return state
  }
}


const expenseReducer = (state = [], action) => {
  switch (action.type) {
    case 'Add_Expense':
      return [...state, action.expense];//spread operator is used to create new array with old one, it uses what keeps inside in array
    case 'Remove_Expense':
      return state.filter(({id}) => {
        return id !== action.id;
      })
    default:
      return state
  }
}


const filterReducerDefault = {
  text: 'rent',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined
}
const filterReducer = (state = filterReducerDefault, action) => {
  switch (action.type) {
    default:
      return state
  }
}


// Store
const store = createStore(counterReducer)
const combineReducerStore = createStore(combineReducers({
  expenses: expenseReducer,
  filter: filterReducer
}))



// Actions
const Add_Expense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
  }) => ({//First parameter is state and 2nd is action..

    type: 'Add_Expense',
    expense: {
      id: 'wwfuyfd1y2i2ibyviyv',
      description,
      note,
      amount,
      createdAt
    }
  })
const Remove_Expense = ({ id }) => ({
  type: 'Remove_Expense',
  id
})




const increment = ({ incrementBy } = {}) => (//round braces is used in place of return keyword..
  {
    type: "INCREMENT",
    incrementBy
  }
)

const decrement = ({ decrementBy } = {}) => (//round braces is used in place of return keyword..
  {
    type: "DECREMENT",
    decrementBy
  }

)

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
  console.log(combineReducerStore.getState());
})

store.dispatch(increment({ incrementBy: 5 }));
store.dispatch(increment());
store.dispatch(decrement({ decrementBy: 20 }));
const two = combineReducerStore.dispatch(Add_Expense({ description: 'something..', note: "something is noteable" }));
const one = combineReducerStore.dispatch(Add_Expense({ description: 'coffee', note: "very hot coffee" }));
combineReducerStore.dispatch(Remove_Expense({ id: two.expense.id }));



// const user = {
//   name: 'saim',
//   age:22
// }
// console.log({
//   ...user,edu:'graduataion', name:'ali'
// })



// console.log(two.expense.id);
console.log(combineReducerStore.getState());
// unsubscribe();
class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
