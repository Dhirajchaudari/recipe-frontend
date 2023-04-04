import React, { useId } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom';
import { useCookies} from 'react-cookie';


export default function CreateRecipe() {
  const userId = useGetUserID();
  const [cookies,_] = useCookies(["access_token"])


  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId
  })

  const navigate = useNavigate()

  const handleChange =  (event) =>{
    const {name , value} = event.target;
    setRecipe({...recipe,[name]:value})
  }

  const handleIngredientsChange =  (event , idx) =>{
    const {value} = event.target;
    const ingredients = [recipe.ingredients];
    ingredients[idx] = value 
    setRecipe({...recipe, ingredients})
    console.log(recipe)
  }

  const addIngridients = () =>{
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""] })
  }

  const onSubmit = async (event) =>{
    event.preventDefault()
    try {
      await axios.post("http://localhost:3001/recipes", recipe, 
      {
        headers: {authorization: cookies.access_token}
      });
      alert("Recipe Created")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name </label>
        <input type="text" id='name' name='name' onChange={handleChange}/>

        <label htmlFor="ingredients"> Ingredients </label>
        {recipe.ingredients.map((ingredient, idx)=> (
          <input 
          key={idx} 
          type='text' 
          name='ingredients' 
          value={ingredient} 
          onChange={(event)=> handleIngredientsChange(event, idx)}/>
        ))}
        <button onClick={addIngridients} type='button'> Add Ingridients </button>

        <label htmlFor="instrctions"> Instructions </label>
        <textarea name="instrctions" id="instrctions" onChange={handleChange}></textarea>

        <label htmlFor="imageUrl">Image Url</label>
        <input type="text" id='imageUrl' name='imageUrl' onChange={handleChange} />

        <label htmlFor="cookingTime">Cooking time (minutes)</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

        <button type='submit'> Create recipe </button>

      </form>
    </div>
  )
}
