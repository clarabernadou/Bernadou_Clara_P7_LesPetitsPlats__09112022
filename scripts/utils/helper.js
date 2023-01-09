import { extractIngredients, extractQuantity, extractUnit } from '../pages/index.js'

export async function getRecipes() {
    let jsonFile = "../../data/recipes.json";
    let data = await fetch(jsonFile);
    let { recipes } = await data.json();
    let response = recipes.map(recipe => {
        recipe.unit = extractUnit(recipe)
        recipe.quantity = extractQuantity(recipe)
        recipe.ingredients = extractIngredients(recipe)
        return recipe
    })
    return { recipes : response }
}