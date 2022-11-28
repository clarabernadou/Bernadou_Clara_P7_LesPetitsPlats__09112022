import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes()

async function init() {
    const { recipes } = await getRecipes();

/* ---------------------------------------------------------- BUTTONS ---------------------------------------------------------- */

    async function displayFilterBlueBtn(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.blueBtn();
        filterSection.appendChild(CardDOM);       
    };

        // WHEN CLICK ON BUTTON
        function whenBtnIsClicked(){
            const buttonTitle = document.querySelector('.ingredients_button h2');
            const buttonIconDown = document.querySelector('.ingredients_button .fa-chevron-down');
            const inputIconUp = document.querySelector('.ingredients_input .fa-chevron-up');
            const listIconUp = document.querySelector('.ingredients_list .fa-chevron-up');

            const button = document.querySelector('.ingredients_button');
            const input = document.querySelector('.ingredients_input');
            const list = document.querySelector('.ingredients_list');

            const ingredientsList = document.querySelector('.align-list');

            // Display search bar
            buttonTitle.addEventListener('click', function(e){
                input.style.display = 'flex';
                button.style.display = 'none';
            });

            // Display search list
            buttonIconDown.addEventListener('click', function(e){
                list.style.display = 'flex';
                button.style.display = 'none';

                const ingredientsArray = [];

                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        ingredientsArray.push(ingredient.ingredient);
                    });
                });

                const uniqueIngredients = [];
                ingredientsArray.filter(ingredient => {
                    if (!uniqueIngredients.includes(ingredient)) {
                        uniqueIngredients.push(ingredient);
                    }
                });

                uniqueIngredients.forEach(ingredient => {
                    const ingredients = document.createElement('a');
                    ingredients.textContent = ingredient;
                    ingredientsList.appendChild(ingredients);                      
                });

                const ingredientBtn = document.querySelectorAll('.align-list a');

                for(let ingredient of ingredientBtn){
                    let notDuplicateFiltre = false;
                    ingredient.addEventListener('click', function(e) {
                        if(notDuplicateFiltre == false){
                            console.log('hello');
                            notDuplicateFiltre = true;
                        }else{
                            console.log('bye');
                        }

                        const section = document.querySelector('.tag_section')

                        const tag = document.createElement('div');
                        const search = document.createElement('p');
                        const icon = document.createElement('i');
                
                        tag.setAttribute('class', 'tag blue_tag');
                        search.textContent = ingredient.text;
                        search.setAttribute('class', 'blue-text-tag');
                        icon.setAttribute('class', 'far fa-times-circle');
                
                        section.appendChild(tag);
                        tag.appendChild(search);
                        tag.appendChild(icon);
                    });
                }
            });

            // Return main button
            inputIconUp.addEventListener('click', function(e){
                button.style.display = 'flex';
                list.style.display = 'none';
                input.style.display = 'none';
            }); 

            // Return main button
            listIconUp.addEventListener('click', function(e){
                button.style.display = 'flex';
                list.style.display = 'none';
                input.style.display = 'none';
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

        function filtreTexte(arr, requete) {
            return arr.filter(function (el) {
                return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
            });
        };        

        searchBar.addEventListener('keyup', function(e){
            let search = searchBar.value;

            if(search.length >= 3) {
                let recipeWithSearch = [];
                let searchIsFilled = false;

                recipes.forEach(recipe => {
                    let recipesName = [recipe.name];
                    let recipesDescription = [recipe.description];
                    let recipesIngredients = [];

                    recipe.ingredients.forEach(ingredient => {
                        recipesIngredients = [ingredient.ingredient];
                    });
                    
                    let ingredientSearch = filtreTexte(recipesIngredients, search);
                    let nameSearch = filtreTexte(recipesName, search);
                    let descriptionSearch = filtreTexte(recipesDescription, search);

                    function displayRecipes(){
                        cardSection.innerHTML = "";
                        searchIsNull.style.display = 'none';
                        recipeWithSearch.forEach(recipe => {
                            const cardModel = cardFactory(recipe);
                            const CardDOM = cardModel.getCardDOM();
                            cardSection.appendChild(CardDOM);                            
                        });
                    };
                    
                    function areThereAnyRecipes(){
                        if(nameSearch == recipe.name){
                            recipeWithSearch.push(recipe);
                            searchIsFilled = true;
                        }else if(descriptionSearch == recipe.description){
                            recipeWithSearch.push(recipe);
                            searchIsFilled = true;
                        }else{
                            recipesIngredients.forEach(ingredient => {
                                if(ingredientSearch == ingredient){
                                    recipeWithSearch.push(recipe);
                                    searchIsFilled = true;
                                };
                            });
                        };

                        if(searchIsFilled == true){
                            displayRecipes()
                        }else{
                            cardSection.innerHTML = "";
                            searchIsNull.style.display = 'flex';
                        };
                    }
                    areThereAnyRecipes()

                });
            }else{
                cardSection.innerHTML = "";
                searchIsNull.style.display = 'none';
                displayData(recipes);
            };
        });
    };

    // BUTTONS
    displayFilterBlueBtn(recipes);
        whenBtnIsClicked();

    // CARDS
    displayData(recipes);

    // SEARCH BAR FILTER
    search(recipes);

};
    
init();