import React, { useRef } from 'react';
import { useOnClickOutside } from '../../utils/hooks';
import './styles.css';

export type BeerType = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  food_pairing: [string];
};

interface Props {
  beer: BeerType | null;
  closeModal: () => void;
  addToCart: () => void;
}

const BeerModal = ({ beer, closeModal, addToCart }: Props) => {
  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);
  if (!beer) return <></>;
  const { name, tagline, description, image_url, abv, food_pairing } = beer;
  return (
    <div className="beer-modal-container">
      <div ref={ref} className="beer-modal">
        <div className="beer-modal-details">
          <h4>{name}</h4>
          <span>{tagline}</span>
          <span>{abv}</span>
          <span>{description}</span>
          <span>{food_pairing}</span>
        </div>
        <img src={image_url} alt="beer" />
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default BeerModal;
