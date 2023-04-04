import { useState, useEffect } from "react"
import axios from 'axios'
import { useGetUserID } from "../../hooks/useGetUserID";

export  const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserID()
  useEffect( () => {
    const fetchSavedRecipes = async() =>{
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userId}`);
        setSavedRecipes(response.data.savedRecipes)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSavedRecipes()
  }, [])

  return (
    <div>
      <h1> Saved Recipes </h1>
      <ul>
        {savedRecipes.map((recipe)=>(
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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
