import { useState, useEffect } from 'react';
import type { Ingredients } from '../Types';
import './components.css';
import { supabase } from '../supabaseClient';

interface IngredientMenuProps {
  onAddIngredient: (ingredient: Ingredients) => void;
  isOrdering: boolean;
  burgerBase: Ingredients;
  burgerIngredients: Ingredients[];
}

export default function IngredientMenu({
    onAddIngredient,
    isOrdering,
    burgerBase,
    burgerIngredients
  }: IngredientMenuProps) {
  const [baseIngredients, setBaseIngredients] = useState([]);
  const [normalIngredients, setNormalIngredients] = useState([]);
  const [isBaseOpen, setIsBaseOpen] = useState(true);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);

  useEffect(() => {
    async function obtenerDatos() {
      const { data, error } = await supabase.from('ingredients').select('*');
      if (!error) {
        setBaseIngredients(data.filter((ingredient) => ingredient.type.includes('base')));
        setNormalIngredients(data.filter((ingredient) => !ingredient.type.includes('base')));
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
                onClick={() => onAddIngredient(ingredient)}
                disabled={isOrdering}
              >
                <span className="ingredient-btn-name">{ingredient.name}</span>
                <span className="ingredient-btn-price">+${ingredient.price}</span>
              </button>
            )})}
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
                onClick={() => onAddIngredient(ingredient)}
                disabled={isOrdering}
              >
                <span className='ingredient-btn-name'>{ingredient.name}</span>
                <span className='ingredient-btn-price'>+${ingredient.price}</span>
              </button>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}
