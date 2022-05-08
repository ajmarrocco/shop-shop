import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    // saves items so they are recorded to the database
    useEffect(() => {
        async function saveOrder() {
        const cart = await idbPromise('cart', 'get');
        const products = cart.map((item) => item._id);

        if (products.length) {
            // passes IDs to add order
            const { data } = await addOrder({ variables: { products } });
            const productData = data.addOrder.products;
            // deletes after using it
            productData.forEach((item) => {
            idbPromise('cart', 'delete', item);
            });
        }
        // returns to homepage after three seconds
        setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        }
        // saves in order history
        saveOrder();
    }, [addOrder]);

    return (
        <div>
        <Jumbotron>
            <h1>Success!</h1>
            <h2>Thank you for your purchase!</h2>
            <h2>You will now be redirected to the home page</h2>
        </Jumbotron>
        </div>
    );
}

export default Success;
