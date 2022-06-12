import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideOrderFrom as hideOrderFromAction } from '../../store/actions/orderForm/orderForm.actions';
import './OrderForm.css';

const OrderForm = () => {
  const [massegeText, setMassegeText] = useState('');
  const isFormOpened = useSelector(state => state.orderForm);
  const orderProducts = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const getProductId = orderProducts.map(product => product.id
  );

  const checkout = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const respBody = {
      product_ids: getProductId,
      address: e.target.adress.value
    };
    console.log(respBody);
    console.log(token);
    const resp = fetch('http://localhost:8000/users/me/orders/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(respBody)
    }).then(response => 
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(resp => {
        if(resp.status >= 400 && resp.status <= 599) {
          setMassegeText(resp.data.detail.msg);
          if(resp.status === 401) {
            setMassegeText('You are not authorized. Please, login first');
          }
        } else setMassegeText('Your order has been placed');
      })
    );
  };
  return (
    <>
      <Dialog open={isFormOpened}>
        <DialogTitle>
        Fill out the order form
        </DialogTitle>
        <DialogContent>
          <form className="orderForm" onSubmit={checkout}>
            <input name="adress" type="text" placeholder="Write your address"/>
            <label>{massegeText}</label> 
            <button type='submit'>Order</button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(hideOrderFromAction())}>
          Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderForm;
