import React from 'react';
import { BeerType } from '../../../Beers/components/Beer';
import { ReactComponent as Trash } from './svgs/trash.svg';
import { ReactComponent as Minus } from './svgs/minus.svg';
import { ReactComponent as Plus } from './svgs/plus.svg';
import './styles.css';

export type BasketItemType = {
  beer: BeerType;
  count: number;
};

export type UpdateBasketType = (beer: BeerType, n: number) => void;

interface Props {
  item: BasketItemType;
  updateBasket: UpdateBasketType;
}

const BasketItem = ({
  item: {
    beer,
    beer: { id, name, tagline, image_url },
    count,
  },
  updateBasket,
}: Props) => {
  return (
    <div className="basket-item">
      <span className="basket-item-price">{count * id}$</span>
      <img src={image_url} alt="beer" />
      <div>
        <h4>{name}</h4>
        <span>{tagline}</span>
      </div>
      <div className="basket-item-count">
        <Minus onClick={() => updateBasket(beer, -1)} />
        <span>{count}</span>
        <Plus onClick={() => updateBasket(beer, 1)} />
      </div>
      <Trash onClick={() => updateBasket(beer, -count)} />
    </div>
  );
};

export default BasketItem;
