import React, { useReducer, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Beers from './components/Beers';
import BeerModal from './components/BeerModal';
import { BeerType } from './components/Beers/components/Beer';
import { REDUCER_TYPES } from './utils/constants';
import { getAllBeers } from './utils/api';
import { BasketItemType } from './components/Footer/components/BasketItem';

type StateType = {
  activeCategory: number;
  activeSubCategory: number;
  isFooterOpen: boolean;
  openedBeer: BeerType | null;
  beers: Array<BeerType>;
  beersWithPizza: Array<BeerType>;
  beersWithSteak: Array<BeerType>;
  basketItems: Array<BasketItemType>;
};
const INITIAL_STATE = {
  activeCategory: 0,
  activeSubCategory: 1,
  isFooterOpen: false,
  openedBeer: null,
  beers: [],
  beersWithPizza: [],
  beersWithSteak: [],
  basketItems: [],
};

type ActionType = {
  type: string;
  payload?: any;
};

const reducer = (state: StateType, action: ActionType): StateType => {
  const { type, payload } = action;
  switch (type) {
    case REDUCER_TYPES.CHANGE_CATEGORY:
      return {
        ...state,
        activeCategory: payload,
      };
    case REDUCER_TYPES.CHANGE_SUBCATEGORY:
      return {
        ...state,
        activeSubCategory: payload.i,
        beers: (payload.i === 0 && payload.newData) || state.beers,
        beersWithSteak:
          (payload.i === 2 && payload.newData) || state.beersWithSteak,
      };
    case REDUCER_TYPES.TOGGLE_FOOTER:
      return {
        ...state,
        isFooterOpen: !state.isFooterOpen,
      };
    case REDUCER_TYPES.UPDATE_BEERS:
      return {
        ...state,
        beers: payload,
      };
    case REDUCER_TYPES.UPDATE_BEERS_WITH_PIZZA:
      return {
        ...state,
        beersWithPizza: payload,
      };
    case REDUCER_TYPES.UPDATE_BEERS_WITH_STEAK:
      return {
        ...state,
        beersWithSteak: payload,
      };
    case REDUCER_TYPES.UPDATE_OPENED_BEER:
      return {
        ...state,
        openedBeer: payload,
      };
    case REDUCER_TYPES.CLOSE_BEER_MODAL:
      return {
        ...state,
        openedBeer: null,
      };
    case REDUCER_TYPES.UPDATE_BASKET:
      return {
        ...state,
        basketItems: payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    (async () => {
      const { data } = await getAllBeers('food=pizza');
      dispatch({ type: REDUCER_TYPES.UPDATE_BEERS_WITH_PIZZA, payload: data });
    })();
  }, []);
  const handleCategoryChange = (i: number) =>
    dispatch({ type: REDUCER_TYPES.CHANGE_CATEGORY, payload: i });
  const handleSubCategoryChange = async (i: number) => {
    let newData;
    switch (i) {
      case 0:
        if (!state.beers.length) {
          const res = await getAllBeers();
          newData = res.data;
        }
        break;
      case 2:
        if (!state.beersWithSteak.length) {
          const res = await getAllBeers('food=steak');
          newData = res.data;
        }
        break;
    }
    dispatch({
      type: REDUCER_TYPES.CHANGE_SUBCATEGORY,
      payload: { i, newData },
    });
  };
  const addToCart = () => {
    updateBasket(state.openedBeer!, 1);
    closeBeerModal();
  };
  const updateBasket = (beer: BeerType, n: number) => {
    let newBasketItems = state.basketItems.slice();
    const beerIndex = newBasketItems.findIndex((b) => b.beer.id === beer.id);
    if (beerIndex >= 0) {
      newBasketItems[beerIndex].count = newBasketItems[beerIndex].count + n;
    } else {
      newBasketItems.push({ beer, count: 1 });
    }
    newBasketItems = newBasketItems.filter((item) => item.count > 0);
    dispatch({ type: REDUCER_TYPES.UPDATE_BASKET, payload: newBasketItems });
  };
  const toggleFooter = () => dispatch({ type: REDUCER_TYPES.TOGGLE_FOOTER });
  const isBlur = () => state.isFooterOpen || state.openedBeer !== null;
  const getCurrentBeers = () => {
    if (state.activeCategory !== 0) {
      return [];
    }
    switch (state.activeSubCategory) {
      case 0:
        return state.beers;
      case 1:
        return state.beersWithPizza;
      case 2:
        return state.beersWithSteak;
      default:
        return [];
    }
  };
  const onBeerClick = (beer: BeerType) =>
    dispatch({ type: REDUCER_TYPES.UPDATE_OPENED_BEER, payload: beer });
  const closeBeerModal = () =>
    dispatch({ type: REDUCER_TYPES.CLOSE_BEER_MODAL });
  const onSwipedLeft = () => {
    if (state.activeSubCategory < 2 && state.activeCategory === 0) {
      handleSubCategoryChange(state.activeSubCategory + 1);
    }
  };
  const onSwipedRight = () => {
    if (state.activeSubCategory > 0 && state.activeCategory === 0) {
      handleSubCategoryChange(state.activeSubCategory - 1);
    }
  };

  return (
    <main className="app-container">
      <div className={`app-content ${isBlur() ? 'app-content-blur' : ''}`}>
        <Header
          activeCategory={state.activeCategory}
          activeSubCategory={state.activeSubCategory}
          handleSubCategoryChange={handleSubCategoryChange}
          handleCategoryChange={handleCategoryChange}
        />
        <Beers
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          onBeerClick={onBeerClick}
          beers={getCurrentBeers()}
        />
      </div>
      <Footer
        basketItems={state.basketItems}
        toggleFooter={toggleFooter}
        isFooterOpen={state.isFooterOpen}
        updateBasket={updateBasket}
      />
      <BeerModal
        closeModal={closeBeerModal}
        addToCart={addToCart}
        beer={state.openedBeer}
      />
    </main>
  );
};

export default App;
