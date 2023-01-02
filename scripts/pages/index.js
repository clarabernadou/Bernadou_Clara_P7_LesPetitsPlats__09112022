// Import functions
import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

// Get the recipes
const { recipes } = await getRecipes();

// Extract all ingredients from recipes
function extractAllIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.toLowerCase())
    })
    return [new Set(ingredients.flat())]
};

// Extract the ingredients of a recipe
export function extractIngredients(recipe) {
    return recipe.ingredients.map(i => i.ingredient.toLowerCase())
}

// Add blue button in the DOM
async function displayBlueBtn(recipes){
    const filterSection = document.querySelector(".filter_section");
    const cardModel = cardFactory(recipes);
    const CardDOM = cardModel.blueBtn();
    filterSection.appendChild(CardDOM);       
};

function transformTheButton(){
    const button = document.querySelector('.ingredients_button');
    const searchBtn = document.querySelector('.ingredients_input');
    const buttonIconDown = document.querySelector('.ingredients_button .fa-chevron-down');
    const inputIconUp = document.querySelector('.ingredients_input .fa-chevron-up');
    const openSearchBarBtn = document.querySelector('.ingredients_button h2');

    // Display search button
    openSearchBarBtn.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // Display search button
    buttonIconDown.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // Return main button
    inputIconUp.addEventListener('click', function(e){
        button.style.display = 'flex';
        searchBtn.style.display = 'none';
    });
};

// Display recipe cards in the DOM
async function displayData(recipes) {
    const cardSection = document.querySelector(".card_section");
    recipes.forEach((recipe) => {
        const cardModel = cardFactory(recipe);
        const CardDOM = cardModel.getCardDOM();
        cardSection.appendChild(CardDOM);
    });
};

function search(recipes) {
    const searchBar = document.querySelector('.search_bar');
    const searchIsNull = document.querySelector('.search-null');
    const cardSection = document.querySelector(".card_section");
    const searchBarInBtn = document.querySelector('.ingredients_input input');
    const ingredientsList = document.querySelector('.align-list');
    const tagSection = document.querySelector('.tag_section');

    // Add a tag in the DOM
    function displayTag() {
        const tag = document.createElement('div');
        const text = document.createElement('p');
        const icon = document.createElement('i');
                            
        tag.setAttribute('class', 'tag blue_tag');
        text.setAttribute('class', 'text-ingredient-tag');
        text.textContent = tagContent; 
        icon.setAttribute('class', 'far fa-times-circle');
            
        tag.appendChild(text);
        tag.appendChild(icon);
        tagSection.appendChild(tag);

        initAllSearch()
        cardSection.innerHTML = "";
        displayData(recipesFound)
    };

    // Delete the tag in the DOM
    function removeTag() {
        const removeTags = document.querySelectorAll('.fa-times-circle');
        for(let removeTag of removeTags) {
            removeTag.addEventListener('click', function(e){
                let btn = e.target.closest("div")
                btn.remove()
                initAllSearch()
                cardSection.innerHTML = "";
                displayData(recipesFound)
            })
        }
    }
    
    let tagContent // The name of the ingredient that will be in the tag
    let recipesFound // Recipes found after a search
    let ingredientsForDisplay = new Set // The list of ingredients to add tags

    function filterRecipes(recipes) {
        let search = searchBar.value
        let tags = Array.from(document.querySelectorAll(".tag")).map(t => t.textContent)

        // Filter recipes with the search bar
        recipesFound = recipes.filter(recipe => {
            const name = recipe.name.toLowerCase()
            const description = recipe.description.toLowerCase()
            return (
                name.includes(search.toLowerCase()) ||
                description.includes(search.toLowerCase()) ||
                recipe.ingredients.includes(search.toLowerCase())
            )
        })

        // Filter recipes with tags
        if(tags.length){
            recipesFound = recipesFound.filter(recipe => {
                return tags.every(t => recipe.ingredients.includes(t))
            })
        }

        return recipesFound // Return a array of filtered recipes
    };

    // Add in a array the ingredients to add tags
    function ingredientsTags() {
        let search = searchBarInBtn.value
        let recipesFound = filterRecipes(recipes)
        let uniqueIngredients = extractAllIngredients(recipesFound)
        ingredientsForDisplay = new Set

        uniqueIngredients.filter(ingredients => {
            for(let ingredient of ingredients) {
                if(ingredient.includes(search.toLowerCase())) {
                    ingredientsForDisplay.add(ingredient);
                }
            }
        })
    }
    
    // Display an ingredient for tags in the DOM
    function displayIngredients() {
        ingredientsList.innerHTML = '';
        ingredientsForDisplay.forEach(ingredient => {
            const a = document.createElement('a');
            a.setAttribute('class', 'ingredient-in-list');
            a.textContent = ingredient
            ingredientsList.appendChild(a);
        });
    };

    // Init the search with the search bar
    function initSearchBar() {
        searchBar.addEventListener('input', function(e){
            let search = searchBar.value;
            let recipesFound = filterRecipes(recipes)

            // If the search bar contains more than 3 characters
            if(search.length >= 3) {
                initAllSearch()
                // If there are recipes found after the search
                if(recipesFound.length){
                    cardSection.innerHTML = "";
                    searchIsNull.style.display = 'none';
                    displayData(recipesFound)
                }else{
                    cardSection.innerHTML = "";
                    searchIsNull.style.display = 'flex';
                }
            }else{
                cardSection.innerHTML = "";
                searchIsNull.style.display = 'none';
                displayData(recipes);
            }
        })
    };

    // Init the search with the tags
    function initSearchTags() {
        const ingredientsInList = document.querySelectorAll('.ingredient-in-list');
        for(let ingredientInList of ingredientsInList) {
            ingredientInList.addEventListener('click', function(e){
                tagContent = ingredientInList.text // Add the ingredient name to the tag
                displayTag() // Add a tag in the DOM
                removeTag() // Delete the tag in the DOM
            })
        }
    };
    
    function initAllSearch() {
        filterRecipes(recipes) // Filter the recipes
        ingredientsTags() // modify the list of ingredients for the tags
        displayIngredients() // display it
        initSearchTags() // launch the search
    }

    function filterIngredients() {
        ingredientsTags() // modify the list of ingredients for the tags
        displayIngredients() // display it
        initSearchTags() // launch the search
        searchBarInBtn.addEventListener('input', function(e) {
            ingredientsTags()
            displayIngredients()
            initSearchTags()
        })
    };
    
    initSearchBar();
    filterIngredients();
};

async function init() {
    displayBlueBtn(recipes);
    transformTheButton();
    displayData(recipes);
    search(recipes);
};
init();