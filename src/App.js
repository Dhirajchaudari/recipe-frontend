import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Auth from './Pages/auth/auth';
import CreateRecipe from './Pages/create-recipe/create-recipe';
import Navbar from './components/navbar';
import { Home } from './Pages/home/home';
import { SavedRecipes } from './Pages/saved-recipes/saved-recipes';


function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='auth' element={<Auth />} />
          <Route path='create-recipe' element={<CreateRecipe />} />
          <Route path='saved-recipes' element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
