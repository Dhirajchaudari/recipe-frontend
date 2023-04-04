import { useState, useEffect } from "react"
import axios from 'axios'
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies} from 'react-cookie';


export  const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies,_] = useCookies(["access_token"])

  const userId = useGetUserID()
  useEffect( () => {
    const fetchRecipe = async ()=>{ 
      try {
        const responese = await axios.get("http://localhost:3001/recipes");
        setRecipes(responese.data)
        console.log(responese.data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchSavedRecipes = async() =>{
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userId}`);
        setSavedRecipes(response.data.savedRecipes)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRecipe();
    if(cookies.access_token){   
      fetchSavedRecipes()
    }
  }, [])

  const saveRecipe = async (recipeId) =>{
    try {
      const responese = await axios.put("http://localhost:3001/recipes", {
      recipeId, 
      userId
    },
    {headers: {authorization: cookies.access_token}})
      setSavedRecipes(responese.data.setSavedRecipes)
    } catch (error) {
      console.error(error)
    }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id)
  return (
    <div>
      <h1> Recipes </h1>
      <ul>
        {recipes.map((recipe)=>(
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={()=> saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? "Saved": "Save" }
                </button>
            </div>
            <div className="instructions">
              <p> {recipe.instrcutions} </p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p> cooking time: {recipe.cookingTime} (min) </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
