/**
 * To keep this simple, the code is in one file, and it uses Node.js rather
 * than the browser.
 */
const { createStore, applyMiddleware } = require("redux");
const { logger } = require("redux-logger");

const middlewares = [logger];

const seedData = require("./data/seeds");
const INITIAL_STATE = { cats: seedData };

// action types
const CAT_ACTION_TYPES = {
    ADD_CAT: "ADD_CAT",
    REMOVE_CAT: "REMOVE_CAT",
    FEED_CAT: "FEED_CAT",
};

// reducer
const catReducer = (state = INITIAL_STATE, action) => {
    const { cats } = state;

    switch (action.type) {
        case CAT_ACTION_TYPES.ADD_CAT:
            return {
                ...state,
                cats: [...cats, action.payload],
            };
        case CAT_ACTION_TYPES.REMOVE_CAT:
            return {
                ...state,
                cats: [...cats].filter(cat => cat.id !== action.payload),
            };
        case CAT_ACTION_TYPES.FEED_CAT:
            return {
                ...state,
                cats: cats.map(cat =>
                    cat.id === cat.id ? { ...cat, hungry: false } : cat
                ),
            };
    }
};

// store
const store = createStore(catReducer, applyMiddleware(...middlewares));

// this runs every time the state changes
// store.subscribe(() =>
//     console.log("the state changed:", JSON.stringify(store.getState()))
// );

// actions
const addCat = cat => ({
    type: CAT_ACTION_TYPES.ADD_CAT,
    payload: cat,
});

const removeCat = id => ({
    type: CAT_ACTION_TYPES.REMOVE_CAT,
    payload: id,
});

const feedCat = id => ({
    type: CAT_ACTION_TYPES.FEED_CAT,
    payload: id,
});

// main
function main() {
    const newCat = {
        id: 3,
        name: "Cat Stevens",
        hungry: false,
    };

    store.dispatch(addCat(newCat));
    store.dispatch(removeCat(1));
    store.dispatch(feedCat(2));
}

main();
