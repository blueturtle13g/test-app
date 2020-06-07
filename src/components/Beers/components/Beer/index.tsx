import React from 'react';
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
  beer: BeerType;
  onClick: () => void;
}

const Beer = ({ beer: { name, image_url }, onClick }: Props) => {
  return (
    <div onClick={onClick} className="beer-container">
      <img src={image_url} alt="beer" />
      <p>{name}</p>
    </div>
  );
};

export default Beer;
