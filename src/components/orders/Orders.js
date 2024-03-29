import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import "./Orders.css"
import { db } from "../../firebase"
import { useStateValue } from '../stateprovider/StateProvider';
import Order from "../order/Order"
import { Link, useNavigate } from "react-router-dom";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    const Navigate = useNavigate();
  
    //If the user exists, this pulls the orders for the current user and displays them in descending order based on the date created. 
    //OnSnapshot provides a real time snapshot of the database. The below onSnapShot code is saying: For each document, return an object which has an ID and data. 
    useEffect(() => {
      if(user) {
          db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot(snapshot => (
              setOrders(snapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
              })))
          ))
      } else {
          setOrders([])
      }
  
    }, [user])

    return (
        <div className='orders'>
        
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders.length > 0 ? orders?.map(order => (
                    <Order order={order} />
                )) : <p>You have no orders. <Link className='no__orders__link' to="/login">Please create an account to keep track of your orders.</Link></p>
                }
            </div>
        </div>
    )
}

export default Orders