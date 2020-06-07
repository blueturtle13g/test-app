import React, { useRef } from 'react';
import { useOnClickOutside } from '../../utils/hooks';
import { ReactComponent as Basket } from './svgs/basket.svg';
import BasketItem, {
  BasketItemType,
  UpdateBasketType,
} from './components/BasketItem';
import './styles.css';

interface Props {
  basketItems: Array<BasketItemType>;
  isFooterOpen: boolean;
  toggleFooter: () => void;
  updateBasket: UpdateBasketType;
}

const Footer = ({
  basketItems,
  isFooterOpen,
  toggleFooter,
  updateBasket,
}: Props) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => isFooterOpen && toggleFooter());
  const totalPrice = basketItems.reduce(
    (total, item) => total + item.beer.id * item.count,
    0
  );
  return (
    <footer
      ref={ref}
      className={`app-footer ${isFooterOpen ? 'app-footer-open' : ''}`}
    >
      <div onClick={toggleFooter} className="app-footer-header">
        <span />
        <div>
          <Basket />
          <h4 className="app-footer-title">Shopping Cart</h4>
        </div>
      </div>
      {basketItems.map((item) => (
        <BasketItem
          updateBasket={updateBasket}
          key={item.beer.name}
          item={item}
        />
      ))}
      <h3 className="app-footer-total">TOTAL PRICE: {totalPrice}$</h3>
    </footer>
  );
};

export default Footer;
