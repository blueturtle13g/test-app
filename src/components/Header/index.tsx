import React, { useCallback } from 'react';
import { ReactComponent as Discount } from './svgs/discount.svg';
import { ReactComponent as Kitchen } from './svgs/kitchen.svg';
import { ReactComponent as Search } from './svgs/search.svg';
import { ReactComponent as Tea } from './svgs/tea.svg';
import './styles.css';
import {
  SUBCATEGORIES,
  NUMBER_OF_CATEGORIES,
  NUMBER_OF_SUBCATEGORIES,
} from '../../utils/constants';

interface Props {
  activeCategory: number;
  activeSubCategory: number;
  handleCategoryChange: (i: number) => void;
  handleSubCategoryChange: (i: number) => void;
}

const Header = ({
  activeCategory,
  activeSubCategory,
  handleCategoryChange,
  handleSubCategoryChange,
}: Props) => {
  const renderSubcategories = useCallback(
    (title: string, i: number) => (
      <span
        key={title}
        className={activeSubCategory === i ? 'nav-subcategories-active' : ''}
        onClick={() => handleSubCategoryChange(i)}
      >
        {title}
      </span>
    ),
    [handleSubCategoryChange, activeSubCategory]
  );
  const categoriesLeftPosition =
    (activeCategory * window.innerWidth) / NUMBER_OF_CATEGORIES + 'px';
  const subcategoriesLeftPosition =
    -(activeSubCategory - 1) * (window.innerWidth / NUMBER_OF_SUBCATEGORIES);
  return (
    <header className="app-header">
      <h1>Demo App</h1>
      <nav>
        <div
          style={{
            left: categoriesLeftPosition,
          }}
          className="category-highliter"
        />
        <Tea
          onClick={() => handleCategoryChange(0)}
          className="nav-category-icon"
        />
        <Kitchen
          onClick={() => handleCategoryChange(1)}
          className="nav-category-icon"
        />
        <Discount
          onClick={() => handleCategoryChange(2)}
          className="nav-category-icon"
        />
        <Search
          onClick={() => handleCategoryChange(3)}
          className="nav-category-icon"
        />
      </nav>
      <div className="nav-subcategories">
        {activeCategory > 0 ? (
          <span className="nav-subcategories-active">ALL</span>
        ) : (
          <div
            style={{ left: subcategoriesLeftPosition }}
            className="nav-subcategories-slider"
          >
            {SUBCATEGORIES.map(renderSubcategories)}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
