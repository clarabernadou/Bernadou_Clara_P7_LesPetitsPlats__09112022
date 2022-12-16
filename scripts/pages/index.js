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
    
        // Display ingredients suggestion
        function displayIngredients() {
            ingredientsList.innerHTML = ''; 

            ingredientsForDisplay.forEach(ingredient => {
                const a = document.createElement('a');
                a.setAttribute('class', 'ingredient-in-list');
                a.textContent = ingredient
                ingredientsList.appendChild(a);
            });
        }

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
        }

        let search;
        let ingredientsArray = [];
        let recipesFound;
        let ingredientsForDisplay;
        let elementInArray = false;
        let tagContent;

        function filterByText(recipes) {
            recipesFound = new Set;
            ingredientsForDisplay = new Set;
            recipes.forEach(recipe => {
                let recipesName = [recipe.name.toLowerCase()];
                let recipesDescription = [recipe.description.toLowerCase()];
                recipe.ingredients.forEach(ingredient => {
                    ingredientsArray.push(ingredient.ingredient.toLowerCase());
                });

                let nameSearch = filtreTexte(recipesName, search);
                let descriptionSearch = filtreTexte(recipesDescription, search);
                let ingredientSearch = filtreTexte(ingredientsArray, search);

                ingredientSearch.forEach(ingredient => {
                    ingredientsForDisplay.add(ingredient);                
                });

                recipesName.forEach(name => {
                    if(nameSearch == name){
                        recipesFound.add(recipe);
                        elementInArray = true;
                    }
                });
                recipesDescription.forEach(description => {
                    if(descriptionSearch == description){
                        recipesFound.add(recipe);
                        elementInArray = true;
                    }
                });
                ingredientsArray.forEach(ingredient => {
                    if(ingredientSearch == ingredient){
                        recipesFound.add(recipe);
                        elementInArray = true;
                    };
                });
            });
        };

        function filterByTag(recipes) {
            recipesFound = new Set;
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    ingredientsArray.push(ingredient.ingredient.toLowerCase());
                });

                ingredientsArray.forEach(ingredient => {
                    if(tagContent == ingredient){
                        recipesFound.add(recipe);
                        elementInArray = true;
                    };
                });
            });
            console.log(recipesFound);
        };
              
        function searchWithBar() {
            searchBar.addEventListener('keyup', function(e){
                search = searchBar.value;
                if(search.length >= 3) {
                    filterByText(recipes);
                    if(elementInArray == true){
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
            });
        }

        function searchWithBtn() {
            filterByTag(recipes);
            if(elementInArray == true){
                displayRecipes();
            }
        }

        function filterIngredients() {
            searchBarInBtn.addEventListener('keyup', function(e) {
                search = searchBarInBtn.value;
                filterByText(recipes)
                displayIngredients();

                const ingredientsInList = document.querySelectorAll('.ingredient-in-list');
                for(let ingredientInList of ingredientsInList) {
                    ingredientInList.addEventListener('click', function(e) {
                        tagContent = ingredientInList.text
                        displayTag();
                        searchWithBtn()
                    });
                };
            });
        }
        searchWithBar();
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