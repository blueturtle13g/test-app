import React from 'react';
import { useSwipeable } from 'react-swipeable';
import Beer, { BeerType } from './components/Beer';
import './styles.css';

interface Props {
  beers: Array<BeerType>;
  onBeerClick: (beer: BeerType) => void;
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

const Beers = ({ beers, onBeerClick, onSwipedLeft, onSwipedRight }: Props) => {
  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <section {...handlers} className="beers-container">
      {beers.map((beer) => (
        <Beer key={beer.id} beer={beer} onClick={() => onBeerClick(beer)} />
      ))}
    </section>
  );
};

export default Beers;
