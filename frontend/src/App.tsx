import { useState } from 'react';
import './App.css';
import type { Ingredients } from './Types';
import IngredientMenu from './components/IngredientMenu';
import BurgerPreview from './components/BurgerPreview';
import OrderSummary from './components/OrderSummary';

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState<Ingredients[]>([]);
  const [burgerBase, setBurgerBase] = useState<Ingredients | null>(null);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  const handleAddIngredient = (ingredient: Ingredients) => {
    if (ingredient.type.includes('base')) {
      setBurgerBase(ingredient);
    } else {
      setBurgerIngredients([...burgerIngredients, ingredient]);
    }
  };

  const saveOrder = () => {
    setIsOrdering(!isOrdering);
  };

  return (
    <>
      <div className="app-container">
        <h1 className="title">Gourmet Burger Builder</h1>
        <div className="order-actions">
          <button className="btn-order" disabled={isOrdering} onClick={() => saveOrder()}>
            <span className="btn-text-main">Place Order!</span>
            <span className="btn-text-sub">
              Your customed burger is one click of distance.
            </span>
          </button>
        </div>
        <div className="app-burger">
          <div className="column scrollable">
            <IngredientMenu onAddIngredient={handleAddIngredient} isOrdering={isOrdering} />
          </div>
          <div className="column">
            <BurgerPreview burgerBase={burgerBase} ingredients={burgerIngredients} />
          </div>
          <div className="column scrollable">
            <OrderSummary burgerBase={burgerBase} ingredients={burgerIngredients} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
