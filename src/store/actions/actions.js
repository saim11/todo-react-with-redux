import firebase from 'firebase';
import uuid from 'uuid';


export const addData = ({ addTodo }) => {
    return dispatch => {
        firebase.database().ref('todos/').push({ todo: { id: uuid(), addTodo } })
            .then(() => {
                // console.log(addTodo, " is added")
            })
    }
}

let currentTodos = []
export const getData = () => {
    return dispatch => {
        firebase.database().ref('todos/').on('value', (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                // var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                currentTodos = [...currentTodos, childData];
            })
            dispatch({ type: "GET_TODO", payload: currentTodos });
            currentTodos = [];
        })
    }
}


export const updateData = ({ id, updatedTodo }) => {
    return dispatch => {
        let count = 0;
        firebase.database().ref('todos/').on('value', (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData.todo.id === id && count === 0) {
                    firebase.database().ref('todos/' + childKey + '/todo/').set({
                        id: id,
                        addTodo: updatedTodo
                    });
                    count = count + 1;
                }
            })


        })
    }
}

export const deleteData = ({ id }) => {
    return dispatch => {

        firebase.database().ref('todos/').on('value', (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData.todo.id === id) {
                    firebase.database().ref('todos/'+childKey).remove();
                };
                
                
            })


        })
    }
}    
