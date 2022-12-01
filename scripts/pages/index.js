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
            const buttonIconDown = document.querySelector('.ingredients_button .fa-chevron-down');
            const inputIconUp = document.querySelector('.ingredients_input .fa-chevron-up');
            const listIconUp = document.querySelector('.ingredients_list .fa-chevron-up');

            const button = document.querySelector('.ingredients_button');
            const input = document.querySelector('.ingredients_input');
            const list = document.querySelector('.ingredients_list');

            const ingredientsList = document.querySelector('.align-list');

            const ingredientsArray = [];
            const uniqueIngredients = [];

            const openSearchBarBtn = document.querySelector('.ingredients_button h2');
            const Btn = document.querySelector('.ingredients_button');
            const searchBtn = document.querySelector('.ingredients_input');

            openSearchBarBtn.addEventListener('click', function(e){
                searchBtn.style.display = 'flex';
                Btn.style.display = 'none';
            });

            // Display search list
            buttonIconDown.addEventListener('click', function(e){
                list.style.display = 'flex';
                button.style.display = 'none';

                
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        ingredientsArray.push(ingredient.ingredient);
                    });
                });
                
                ingredientsArray.filter(ingredient => {
                    if (!uniqueIngredients.includes(ingredient)) {
                        uniqueIngredients.push(ingredient);
                    };
                });

                uniqueIngredients.forEach(ingredient => {
                    const ingredients = document.createElement('a');
                    ingredients.textContent = ingredient;
                    ingredientsList.appendChild(ingredients);                      
                });

                // TAG
                // const ingredientBtn = document.querySelectorAll('.align-list a');

                // for(let ingredient of ingredientBtn){
                //     let notDuplicateFiltre = false;
                //     ingredient.addEventListener('click', function(e) {
                //         if(notDuplicateFiltre == false){
                //             const section = document.querySelector('.tag_section')

                //             const tag = document.createElement('div');
                //             const search = document.createElement('p');
                //             const icon = document.createElement('i');
                    
                //             tag.setAttribute('class', 'tag blue_tag');
                //             search.textContent = ingredient.text;
                //             search.setAttribute('class', 'blue-text-tag');
                //             icon.setAttribute('class', 'far fa-times-circle');
                    
                //             section.appendChild(tag);
                //             tag.appendChild(search);
                //             tag.appendChild(icon);

                //             notDuplicateFiltre = true;
                //         }
                //     });
                // }
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
        const section = document.querySelector('.tag_section');
        const searchBar = document.querySelector('.search_bar');
        const searchIsNull = document.querySelector('.search-null');
        const cardSection = document.querySelector(".card_section");
        const searchBarInBtn = document.querySelector('.ingredients_input input');
        const ingredientsList = document.querySelector('.align-search-list');
        const ingredientsInList = document.querySelectorAll('.ingredient-in-list');

        let recipeWithSearch = [];

        // Word-by-word search function
        function filtreTexte(arr, requete) {
            return arr.filter(function (el) {
                return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
            });
        };        

        // Search via search bar
        searchBar.addEventListener('keyup', function(e){
            let search = searchBar.value; // Value entered in the search bar

            if(search.length >= 3) {
                recipeWithSearch = []; // To store search results
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

        // Search via search bar in button
        searchBarInBtn.addEventListener('change', function(e){
            let search = searchBarInBtn.value;
            let recipesIngredients = [];
            let uniqueIngredients = [];
            recipeWithSearch = [];

            if(search.length >= 3){
                // Create an array to filter each element word by word after
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        recipesIngredients.push(ingredient.ingredient)

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

                        // Filter each element word by word
                        let ingredientSearch = filtreTexte(recipesIngredients, search);

                        // Remove duplicate elements
                        ingredientSearch.forEach(element => {
                            if(element == ingredient.ingredient){
                                if (!recipeWithSearch.includes(recipe)) {
                                    recipeWithSearch.push(recipe);
                                }
                                displayRecipes();
                            }                            
                        });

                    });

                    recipesIngredients.filter(ingredient => {
                        if (!uniqueIngredients.includes(ingredient)) {
                            uniqueIngredients.push(ingredient);
                        };
                    });

                    ingredientsList.innerHTML = ''; // Reset ingredients list
                    uniqueIngredients.forEach(ingredient => {
                        const ingredients = document.createElement('a');
                        ingredients.setAttribute('class', 'ingredient-in-list');
                        ingredients.textContent = ingredient;
                        ingredientsList.appendChild(ingredients);                            
                    });                   
                });
            }else{
                ingredientsList.innerHTML = ''; // Reset ingredients list
            }
        });

        function tag() {  
            searchBarInBtn.addEventListener('change', function(e){
                const tag = document.createElement('div');
                const search = document.createElement('p');
                const icon = document.createElement('i');
                            
                tag.setAttribute('class', 'tag blue_tag');
                search.textContent = searchBarInBtn.value;
                search.setAttribute('class', 'blue-text-tag');
                icon.setAttribute('class', 'far fa-times-circle');
                            
                section.appendChild(tag);
                tag.appendChild(search);
                tag.appendChild(icon);
            });
            
            
        }
        tag()
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