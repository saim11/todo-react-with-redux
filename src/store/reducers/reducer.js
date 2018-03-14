import firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAOoFIVN_EovDa_AKx6JHJboG99lmgQBnE",
    authDomain: "redux-todo-d45f2.firebaseapp.com",
    databaseURL: "https://redux-todo-d45f2.firebaseio.com",
    projectId: "redux-todo-d45f2",
    storageBucket: "redux-todo-d45f2.appspot.com",
    messagingSenderId: "719444963415"
};
firebase.initializeApp(config);
const INITIAL_STATE = {
    todos: [],
    inputValue: "",
    flag: false
}

// INITIAL_STATE
const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_TODO':
            return ({
                ...state,
                todos: action.payload
            })
        default:
            return state;
    }

}

export default todoReducer;