const grocerySubmit = document.getElementById('addGrocery');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear');

const initialState = {
    groceries: [],
};

const groceryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'grocery/add':
            return {
                ...state,
                groceries: [
                    ...state.groceries,
                    {
                        text: action.text,
                    },
                ],
            };
        case 'grocery/clear':
            return {
                ...state,
                groceries: [],
            };
        default:
            return state;
    }
};

let store = Redux.createStore(groceryReducer);

const renderList = (state) => {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    state.groceries.forEach((grocery) => {
        let li = document.createElement('li');
        list.appendChild(li);
        li.textContent = grocery.text;
    });
};

const newGrocery = (e) => {
    e.preventDefault();
    let groceryText = document.getElementById('newItem').value;
    store.dispatch({
        type: 'grocery/add',
        text: groceryText,
    });
    console.log(store.getState());
};

const clearList = () => {
    document.getElementById('newItem').value = '';
    store.dispatch({
        type: 'grocery/clear',
    });
};

const render = () => {
    const state = store.getState();
    renderList(state);
};

grocerySubmit.addEventListener('click', newGrocery);

clearBtn.addEventListener('click', clearList);

store.subscribe(render);
