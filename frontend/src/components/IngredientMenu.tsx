import { useState, useEffect } from 'react';
import './components.css';
import { supabase } from '../supabaseClient';
import { useBurgerBuilder } from '../context/BurgerContext';
import type { Ingredients } from '../Types';

export default function IngredientMenu({ }) {
  const [baseIngredients, setBaseIngredients] = useState<Ingredients[]>([]);
  const [normalIngredients, setNormalIngredients] = useState<Ingredients[]>([]);
  const [isBaseOpen, setIsBaseOpen] = useState<boolean>(true);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState<boolean>(false);
  const { isOrdering, addIngredient, burgerBase, burgerIngredients } = useBurgerBuilder();

  useEffect(() => {
    async function obtenerDatos() {
      const { data, error } = await supabase.from('ingredients').select('*');
      if (!error) {
        setBaseIngredients(data.filter((ingredient: Ingredients) => ingredient.type.includes('base')));
        setNormalIngredients(data.filter((ingredient: Ingredients) => !ingredient.type.includes('base')));
      }
    }
    obtenerDatos();
  }, []);

  return (
    <div className='menu-container'>
      <h2 className='menu-title'>Select your Ingredients:</h2>
      <div className='collapsible-section'>
        <div
          className='collapsible-header'
          onClick={() => setIsBaseOpen(!isBaseOpen)}
        >
          <p>Base</p>
          <span className={`toggle-icon ${isBaseOpen ? 'open' : ''}`}>▼</span>
        </div>
      </div>
      <div className={`collapsible-content ${isBaseOpen ? 'expanded' : 'collapsed'}`}>
        <span className='base-subtitle'>Select the base for your burger</span>
        <div className='menu'>
          <div className='menu-grid'>
            {baseIngredients.map((ingredient) => {
              const isBaseSelected = burgerBase?.id === ingredient.id;
              return (
                <button
                  key={ingredient.id}
                  className={`menu-button ${isBaseSelected ? 'selected' : ''}`}
                  onClick={() => addIngredient(ingredient)}
                  disabled={!isOrdering}
                >
                  <span className="ingredient-btn-name">{ingredient.name}</span>
                  <span className="ingredient-btn-price">+${ingredient.price}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>


      <div className='collapsible-section'>
        <div
          className='collapsible-header'
          onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
        >
          <p>Ingredients:</p>
          <span className={`toggle-icon ${isIngredientsOpen ? 'open' : ''}`}>▼</span>
        </div>
      </div>
      <div className={`collapsible-content ${isIngredientsOpen ? 'expanded' : 'collapsed'}`}>
        <span className='base-subtitle'>Select the ingredients for your burger</span>
        <div className='menu'>
          <div className='menu-grid'>
            {normalIngredients.map((ingredient) => {
              const isIngredientSelected =
                burgerIngredients.some(burgerIngredient => burgerIngredient.id === ingredient.id);
              return (
                <button
                  key={ingredient.id}
                  className={`menu-button ${isIngredientSelected ? 'selected' : ''}`}
                  onClick={() => addIngredient(ingredient)}
                  disabled={!isOrdering}
                >
                  <span className='ingredient-btn-name'>{ingredient.name}</span>
                  <span className='ingredient-btn-price'>+${ingredient.price}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
