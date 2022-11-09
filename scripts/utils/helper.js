export async function getRecipes() {
    let jsonFile = "../../data/recipes.json";
    let response = await fetch(jsonFile);
    return await response.json();
}