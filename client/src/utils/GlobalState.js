import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// creates new Context object
const StoreContext = createContext();

// Wraps app to make state data
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

// Can grab state from Store Provider component and use the returning dispatc method to update it
const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };