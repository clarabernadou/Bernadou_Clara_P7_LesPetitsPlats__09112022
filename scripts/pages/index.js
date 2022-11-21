import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes()

async function init() {
    const { recipes } = await getRecipes();

/* ---------------------------------------------------------- TAGS ---------------------------------------------------------- */

    async function displayBlueTag(recipes){
        const tagSection = document.querySelector(".tag_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.blueTag();
        tagSection.appendChild(CardDOM);       
    };

    async function displayGreenTag(recipes){
        const tagSection = document.querySelector(".tag_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.greenTag();
        tagSection.appendChild(CardDOM);       
    };

    async function displayRedTag(recipes){
        const tagSection = document.querySelector(".tag_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.redTag();
        tagSection.appendChild(CardDOM);       
    };

/* ---------------------------------------------------------- BUTTONS ---------------------------------------------------------- */

    async function displayBlueBtn(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.blueBtn();
        filterSection.appendChild(CardDOM);       
    };

        // WHEN CLICK ON BUTTON
        function blueBtnOnClick(){
            const buttonTitle = document.querySelector('.ingredients_button h2');
            const buttonIconDown = document.querySelector('.ingredients_button .fa-chevron-down');
            const inputIconUp = document.querySelector('.ingredients_input .fa-chevron-up');
            const listIconUp = document.querySelector('.ingredients_list .fa-chevron-up');

            const button = document.querySelector('.ingredients_button');
            const input = document.querySelector('.ingredients_input');
            const list = document.querySelector('.ingredients_list');

            // Display search bar
            buttonTitle.addEventListener('click', function(e){
                input.style.display = 'flex';
                button.style.display = 'none';
            });

            // Display search list
            buttonIconDown.addEventListener('click', function(e){
                list.style.display = 'flex';
                button.style.display = 'none';
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


    async function displayGreenBtn(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.greenBtn();
        filterSection.appendChild(CardDOM);       
    };
        // WHEN CLICK ON BUTTON
        function greenBtnOnClick(){
            const buttonTitle = document.querySelector('.appliance_button h2');
            const buttonIcon = document.querySelector('.appliance_button i');
            const buttonIconDown = document.querySelector('.appliance_button .fa-chevron-down');
            const inputIconUp = document.querySelector('.appliance_input .fa-chevron-up');
            const listIconUp = document.querySelector('.appliance_list .fa-chevron-up');

            const button = document.querySelector('.appliance_button');
            const input = document.querySelector('.appliance_input');
            const list = document.querySelector('.appliance_list');

            buttonTitle.addEventListener('click', function(e){
                input.style.display = 'flex';
                button.style.display = 'none';
            });

            buttonIcon.addEventListener('click', function(e){
                list.style.display = 'flex';
                button.style.display = 'none';
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

    async function displayRedBtn(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.redBtn();
        filterSection.appendChild(CardDOM);       
    };
    
        // WHEN CLICK ON BUTTON
        function redBtnOnClick(){
            const buttonTitle = document.querySelector('.ustensils_button h2');
            const buttonIcon = document.querySelector('.ustensils_button i');
            const buttonIconDown = document.querySelector('.ustensils_button .fa-chevron-down');
            const inputIconUp = document.querySelector('.ustensils_input .fa-chevron-up');
            const listIconUp = document.querySelector('.ustensils_list .fa-chevron-up');

            const button = document.querySelector('.ustensils_button');
            const input = document.querySelector('.ustensils_input');
            const list = document.querySelector('.ustensils_list');

            buttonTitle.addEventListener('click', function(e){
                input.style.display = 'flex';
                button.style.display = 'none';
            });

            buttonIcon.addEventListener('click', function(e){
                list.style.display = 'flex';
                button.style.display = 'none';
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

/* ----------------------------------------------------------------------------------------------------------------------------------- */

    function searchViaBar(recipes) {
        const searchBar = document.querySelector('.search_bar');
        searchBar.addEventListener('change', function(e){
            let search = searchBar.value;

            if(search.length < 3) {
                alert('Veuillez entrer plus de 3 caractères');
            }else{
                const cardSection = document.querySelector(".card_section");
                let recipeWithSearch = []; // Array to put the recipes with the desired ingredients

                // In the recipe array I get the recipe
                recipes.forEach(recipe => {
                    const recipeIngredients = [];

                    // In the ingredients array I get the ingredient
                    recipe.ingredients.forEach(ingredient => {
                        // And I push in the table to group all the ingredients of the recipe
                        recipeIngredients.push(ingredient.ingredient);
                    });

                    // If the desired ingredient is in the recipe...
                    if(recipeIngredients.includes(search)){
                        cardSection.innerHTML = "";
                        recipeWithSearch.push(recipe);
                    }
                });
                // Display recipes with the ingredients we are looking for
                recipeWithSearch.forEach((recipe) => {
                    const cardModel = cardFactory(recipe);
                    const CardDOM = cardModel.getCardDOM();
                    cardSection.appendChild(CardDOM);
                })
            }
        });
    }

    // TAG
    displayBlueTag(recipes);
    displayGreenTag(recipes);
    displayRedTag(recipes);

    // BUTTONS
    displayBlueBtn(recipes);
        blueBtnOnClick();
    displayGreenBtn(recipes);
        greenBtnOnClick();
    displayRedBtn(recipes);
        redBtnOnClick();

    // CARDS
    displayData(recipes);

    // SEARCH BAR FILTER
    searchViaBar(recipes);

};
    
init();