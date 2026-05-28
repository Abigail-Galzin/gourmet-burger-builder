import './App.css';
import IngredientMenu from './components/IngredientMenu';
import BurgerPreview from './components/BurgerPreview';
import OrderSummary from './components/OrderSummary';
import { BurgerProvider } from './context/BurgerContext';
import BurgerBuilder from './components/BurgerBuilder';

function App() {
  return (
    <>
      <BurgerProvider>
        <div className="app-container">
          <div>
            <BurgerBuilder/>
          </div>
          <div className="app-burger">
            <div className="column scrollable">
              <IngredientMenu />
            </div>
            <div className="column">
              <BurgerPreview />
            </div>
            <div className="column">
              <OrderSummary />
            </div>
          </div>
        </div>
      </BurgerProvider>
    </>
  );
}

export default App;
