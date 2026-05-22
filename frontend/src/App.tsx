import { useState } from 'react'
import './App.css'
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
  }


  return (
    <>
    <div className='app-container'>
      <h1>Gourmet Burger Builder</h1>
      <div>
        <IngredientMenu onAddIngredient={handleAddIngredient} />
        <BurgerPreview burgerBase={burgerBase} ingredients={burgerIngredients}/>
        <OrderSummary burgerBase={burgerBase} ingredients={burgerIngredients}/>
      </div>
      <button
        disabled={isOrdering}
        onClick={() => saveOrder()}>
            Place Order!
      </button>
    </div>
    </>
  )
}

export default App
