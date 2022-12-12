import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes()

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

        // Array with found recipes
        let recipesFound;
        let ingredientIsSearch = new Set;

        // Filter function letter by letter
        function filtreTexte(arr, requete) {
            return arr.filter(function (el) {
                return el.indexOf(requete) !== -1;
            });
        };

        // Show recipes result in page
        function displayRecipes(){
            cardSection.innerHTML = "";
            searchIsNull.style.display = 'none';

            recipesFound.forEach(recipe => {
                const cardModel = cardFactory(recipe);
                const CardDOM = cardModel.getCardDOM();
                cardSection.appendChild(CardDOM);                            
            });
        };

        // Search recipes with bar
        searchBar.addEventListener('keyup', function(e){
            let search = searchBar.value;
            
            if(search.length >= 3) {
                recipesFound = new Set;
                let elementInArray = false;

                recipes.forEach(recipe => {
                    // Array with names, descriptions and ingredients to help find recipes
                    let recipesName = [recipe.name];
                    let recipesDescription = [recipe.description];
                    let recipesIngredients;
                    recipe.ingredients.forEach(ingredient => {
                        recipesIngredients = [ingredient.ingredient];
                    });

                    // Filter each name, description, ingredient (letter by letter) to get a result that matches the search bar
                    let nameSearch = filtreTexte(recipesName, search);
                    let descriptionSearch = filtreTexte(recipesDescription, search);
                    let ingredientSearch = filtreTexte(recipesIngredients, search);

                    // If any names matches the search ⬇️
                    if(nameSearch == recipe.name){
                        recipesFound.add(recipe);
                        elementInArray = true;
                    // If any descriptions matches the search ⬇️
                    }else if(descriptionSearch == recipe.description){
                        recipesFound.add(recipe);
                        elementInArray = true;
                    // If any ingredients matches the search ⬇️
                    }else{
                        recipesIngredients.forEach(ingredient => {
                            if(ingredientSearch == ingredient){
                                recipesFound.add(recipe);
                                elementInArray = true;
                            };
                        });
                    };

                    // Show results ⬇️
                    if(elementInArray == true){
                        displayRecipes()
                    // Show error message ⬇️
                    }else{
                        cardSection.innerHTML = "";
                        searchIsNull.style.display = 'flex';
                    };
                });
            // Show original card order ⬇️
            }else{
                cardSection.innerHTML = "";
                searchIsNull.style.display = 'none';
                displayData(recipes);
            };
        });

        // Search with bar in button
        searchBarInBtn.addEventListener('keyup', function(e) {
            let search = searchBarInBtn.value;
            let ingredientsForDisplay = new Set;
            let ingredientsArray = [];
            recipesFound = new Set;

            // Collect all recipe ingredients
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    ingredientsArray.push(ingredient.ingredient.toLowerCase());
                });

                // Filter each ingredient (letter by letter) to get a result that matches the search bar
                let recipesSearch = filtreTexte(ingredientsArray, search);
                console.log(recipesSearch);

                // Add the ingredients (in lowercase) in the "new Set" so as not to have a duplicate
                recipesSearch.forEach(ingredient => {
                    ingredientsForDisplay.add(ingredient);                
                });

                // Reset the ingredient list
                ingredientsList.innerHTML = '';           
            
                ingredientsForDisplay.forEach(ingredient => { 
                    // Show found ingredients
                    const a = document.createElement('a');
                    a.setAttribute('class', 'ingredientOnClick');
                    a.textContent = ingredient;
                    ingredientsList.appendChild(a);
                    
                    a.addEventListener('click', function(e) {
                        const tag = document.createElement('div');
                        const text = document.createElement('p');
                        const icon = document.createElement('i');
                                    
                        tag.setAttribute('class', 'tag blue_tag');
                        text.setAttribute('class', 'text-tag');
                        text.textContent = ingredient;
                        icon.setAttribute('class', 'far fa-times-circle');
                        
                        tagSection.appendChild(tag);
                        tag.appendChild(text);
                        tag.appendChild(icon);
                    });
                }); 
            });
        });
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