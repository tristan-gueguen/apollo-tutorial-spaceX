import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { GetCartItems } from './__generated__/GetCartItems';
import { Header, Loading } from '../components';
import { BookTrips, CartItem } from '../containers';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`
interface CartProps extends RouteComponentProps {

}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItems>(
    GET_CART_ITEMS);

  if (loading) return <Loading />
  if (error) return <p>ERROR: {error.message}</p>

  return (
    <Fragment>
      <Header>My Cart</Header>
      {data?.cartItems.length === 0 ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {data?.cartItems.map((launchId: any) => (
            <CartItem key={launchId} launchId={launchId}/>
          ))}
          <BookTrips cartItems={data?.cartItems || []} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart;
