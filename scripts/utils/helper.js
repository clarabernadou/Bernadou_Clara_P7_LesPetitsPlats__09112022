export async function getRecipes() {
    let jsonFile = "../../data/recipes.json";
    let response = await fetch(jsonFile);
    console.log(response);
    return await response.json();
}