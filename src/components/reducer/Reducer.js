//The reducer allows you to dispatch or push data into the data layer E.g. adding an item to your basket. Think of the reducer as something that is always listening for actions E.g. "ADD_TO_BASKET" or "REMOVE_FROM_BASKET" actions

export const initialState = {
  basket: [],
  user: null,
};

//Selector
export const getBasketTotal = (basket) =>
//reduce maps through the basket to calculate the total. It will add the price of the item most recently added. The initial total of the basket is set to 0
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, //This returns whatever the state of the basket currently was
        basket: [...state.basket, action.item], //This returns whatever the state of the basket currently was + the item that has been passed within the ADD_TO_BASKET action. This pushes the item into our basket
      };

      case 'EMPTY_BASKET':
        return {
          ...state,
          basket: []
        }
    
        //This looks through all the items in the basket and checks whether any of the basket items matches the action ID that has been passed.
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      
      //This copies the state of the new basket.
      let newBasket = [...state.basket];
      
      //If the index is greater that 0, that means that the ID was found and it will find where that item is within the array and cut it by one.
      if ((index) => 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Cant remove product (id: ${action.id}) as its not in basket!"
        );
      }

      //This returns the current state and the basket is now going to be the new basket which has been modified. 
      return { ...state, basket: newBasket };

      //This was dispatched from App.js. This will act as a listener within the data layer and will update the user to become the user (auth user) that was dispatched. 
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
