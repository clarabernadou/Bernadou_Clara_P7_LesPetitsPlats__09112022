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

        // Word-by-word search function
        function filtreTexte(arr, requete) {
            return arr.filter(function (el) {
                return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
            });
        };        

        searchBar.addEventListener('keyup', function(e){
            let search = searchBar.value; // Value entered in the search bar

            if(search.length >= 3) {
                let recipeWithSearch = []; // To store search results
                let searchIsFilled = false; // To display a message if there are no recipes

                recipes.forEach(recipe => {
                    // Create an array to filter each element word by word after
                    let recipesName = [recipe.name];
                    let recipesDescription = [recipe.description];
                    let recipesIngredients = []; // ⬇️
                    recipe.ingredients.forEach(ingredient => {
                        recipesIngredients = [ingredient.ingredient];
                    });
                    
                    // Filter each element word by word
                    let ingredientSearch = filtreTexte(recipesIngredients, search);
                    let nameSearch = filtreTexte(recipesName, search);
                    let descriptionSearch = filtreTexte(recipesDescription, search);

                    function displayRecipes(){
                        cardSection.innerHTML = ""; // Reset Recipes
                        searchIsNull.style.display = 'none'; // To hide the message that says there are no recipes

                        // For each recipe, it is displayed with the factory
                        recipeWithSearch.forEach(recipe => {
                            const cardModel = cardFactory(recipe);
                            const CardDOM = cardModel.getCardDOM();
                            cardSection.appendChild(CardDOM);                            
                        });
                    };
                    
                    // Are there recipe names that match? ⬇️
                    if(nameSearch == recipe.name){
                        recipeWithSearch.push(recipe);
                        searchIsFilled = true;
                    //  Any descriptions that match? ⬇️
                    }else if(descriptionSearch == recipe.description){
                        recipeWithSearch.push(recipe);
                        searchIsFilled = true;
                    }else{
                        recipesIngredients.forEach(ingredient => {
                            // Which ingredients that match? ⬇️
                            if(ingredientSearch == ingredient){
                                recipeWithSearch.push(recipe);
                                searchIsFilled = true;
                            };
                        });
                    };

                    // If there are recipes in the table ⬇️
                    if(searchIsFilled == true){
                        displayRecipes()
                    // Else, there are no recipes in the table ⬇️
                    }else{
                        cardSection.innerHTML = ""; // Reset Recipes
                        searchIsNull.style.display = 'flex'; // To display the message that says there are no recipes
                    };
                });
            // If less than 3 characters are entered in the search bar ⬇️
            }else{
                cardSection.innerHTML = ""; // Reset Recipes
                searchIsNull.style.display = 'none'; // To hide the message that says there are no recipes
                displayData(recipes); // Display Recipes
            };
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