import { Reference, useMutation, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { cartItemsVar } from '../cache';
import { Button } from '../components';

import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`

interface ActionButtonProps extends Partial<LaunchDetailTypes.LaunchDetails_launch> {}

const CancelTripButton: React.FC<ActionButtonProps> = ({ id }) => {
  const [mutate, { loading, error }] = useMutation(
    CANCEL_TRIP,
    {
      variables: { launchId: id },
      update(cache, { data: { cancelTrip } }) {
        const launch = cancelTrip.launches[0]
        cache.modify({
          id: cache.identify({
            __typename: 'User',
            id: localStorage.getItem('userId'),
          }),
          fields: {
            trips(existingTrips: Reference[], { readField }) {
              return existingTrips.filter(
                tripRef => readField("id", tripRef) !== launch.id
              )
            }
          }
        })
      }
    }
  )

  if (loading) return <p>Loading ...</p>
  if (error) return <p>An error occured</p>

  return (
    <div>
      <Button
        onClick={() => mutate()}
        data-testid={'action-button'}
      >
        Cancel This Trip
      </Button>
    </div>
  )
}

const ToggleTripButton: React.FC<ActionButtonProps> = ({ id }) => {
  const cartItems = useReactiveVar(cartItemsVar)
  const isInCart = id ? cartItems.includes(id) : false
  return(
    <div>
      <Button
      onClick={() => {
        if (id) {
          cartItemsVar(
            isInCart
              ? cartItems.filter(itemId => itemId !== id)
              : [...cartItems, id]
          )
        }
      }}
      data-testid={'action-button'}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
    </div>
  )
}
const ActionButton: React.FC<any> = ({ isBooked, id }) => (
  isBooked ? <CancelTripButton id={id} /> : <ToggleTripButton id={id} />
)

export default ActionButton;