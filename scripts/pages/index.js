import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes()

let uniqueIngredients;
let recipeIngredients;

function extractIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.ingredient.toLowerCase())
    })

    uniqueIngredients = [new Set(ingredients.flat())]
};

function extractRecipeIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.ingredient.toLowerCase())
    })

    recipeIngredients = ingredients
};



async function init() {
    const { recipes } = await getRecipes();

/* --------------------------------------------------------- FILTERS --------------------------------------------------------- */

    async function displayFilterBlueBtn(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.blueBtn();
        filterSection.appendChild(CardDOM);       
    };

    // WHEN CLICK ON BUTTON
    function whenBtnIsClicked(){
        const button = document.querySelector('.ingredients_button');
        const searchBtn = document.querySelector('.ingredients_input');
        const buttonIconDown = document.querySelector('.ingredients_button .fa-chevron-down');
        const inputIconUp = document.querySelector('.ingredients_input .fa-chevron-up');
        const openSearchBarBtn = document.querySelector('.ingredients_button h2');

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

/* --------------------------------------------------------- RECIPE CARDS --------------------------------------------------------- */

    // DISPLAY RECIPES
    async function displayData(recipes) {
        const cardSection = document.querySelector(".card_section");
        recipes.forEach((recipe) => {
            const cardModel = cardFactory(recipe);
            const CardDOM = cardModel.getCardDOM();
            cardSection.appendChild(CardDOM);
        });
    };

/* ------------------------------------------------------------ SEARCH ------------------------------------------------------------ */

    function search(recipes) {
        const searchBar = document.querySelector('.search_bar');
        const searchIsNull = document.querySelector('.search-null');
        const cardSection = document.querySelector(".card_section");
        const searchBarInBtn = document.querySelector('.ingredients_input input');
        const ingredientsList = document.querySelector('.align-list');
        const tagSection = document.querySelector('.tag_section');

        // Show recipes result in page
        function displayRecipes(){
            cardSection.innerHTML = "";
            searchIsNull.style.display = 'none';

            recipesFound.forEach(recipe => {
                const cardModel = cardFactory(recipe);
                const CardDOM = cardModel.getCardDOM();
                cardSection.appendChild(CardDOM);                            
            })
        };
    
        // Display ingredients suggestion
        function displayIngredients() {
            ingredientsList.innerHTML = '';

            ingredientsForDisplay.forEach(ingredient => {
                const a = document.createElement('a');
                a.setAttribute('class', 'ingredient-in-list');
                a.textContent = ingredient
                ingredientsList.appendChild(a);
            });
        };

        // Display tags
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
        };

        let recipesFound;
        let tagContent;
        let tagsArray = [];
        let ingredientsForDisplay = new Set

        function filterByText(recipes) {
            let search = searchBar.value
            recipesFound = recipes.filter(recipe => {
                const name = recipe.name.toLowerCase()
                const description = recipe.description.toLowerCase()
                extractIngredients(recipes)
                return name.includes(search.toLowerCase()) ||
                    description.includes(search.toLowerCase()) ||
                        uniqueIngredients.includes(search.toLowerCase())
            })
        };

        function getIngredients() {
            let search = searchBarInBtn.value
            ingredientsForDisplay = new Set
            extractIngredients(recipes)

            uniqueIngredients.filter(ingredients => {
                for(let ingredient of ingredients) {
                    if(ingredient.includes(search.toLowerCase())) {
                        ingredientsForDisplay.add(ingredient);
                    }
                }
            })
        };
              
        function initSearchBar() {
            searchBar.addEventListener('input', function(e){
                let search = searchBar.value;
                if(search.length >= 3) {
                    filterByText(recipes)
                    if(recipesFound.length > 0){
                        displayRecipes()
                    }else{
                        cardSection.innerHTML = "";
                        searchIsNull.style.display = 'flex';
                    };
                }else{
                    cardSection.innerHTML = "";
                    searchIsNull.style.display = 'none';
                    displayData(recipes);
                }
            })
        };

        function removeTag() {
            const removeTags = document.querySelectorAll('.fa-times-circle');
            for(let removeTag of removeTags) {
                removeTag.addEventListener('click', function(e){
                    let btn = e.target.closest("div")
                    let ingredient = btn.querySelector('p').innerText;
                    // let remove = tagsArray.filter(tag => tag == ingredient)
                    let index = tagsArray.findIndex(tag => tag == ingredient)
                    delete tagsArray[index]
                    btn.remove()
                    console.log(tagsArray);
                })
            }
        }

        function filterRecipes() {
            extractRecipeIngredients(recipes)
        }

        function initSearchTags() {
            const ingredientsInList = document.querySelectorAll('.ingredient-in-list');
            for(let ingredientInList of ingredientsInList) {
                ingredientInList.addEventListener('click', function(e){
                    tagContent = ingredientInList.text
                    tagsArray.push(ingredientInList.text)
                    displayTag()
                    removeTag()
                    filterRecipes()
                })
            }
        };

        function filterIngredients() {
            getIngredients()
            displayIngredients()
            initSearchTags()
            searchBarInBtn.addEventListener('input', function(e) {
                getIngredients()
                displayIngredients()
                initSearchTags()
            })
        };
        initSearchBar();
        filterIngredients();
    };

    // BUTTONS
    displayFilterBlueBtn(recipes);
        whenBtnIsClicked();
    // CARDS
    displayData(recipes);
    // SEARCH
    search(recipes);

};
init();