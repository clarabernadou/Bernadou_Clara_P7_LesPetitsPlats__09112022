import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes()

async function init() {
    const { recipes } = await getRecipes();

    // DISPLAY ORIGIN FILTER BUTTONS
    async function displayFilterBtn(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.getFilterBtn();
        filterSection.appendChild(CardDOM);       
    }

    // DISPLAY INPUT FOR SEARCH
    async function displayFilterInput(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.getFilterInput();
        filterSection.appendChild(CardDOM);       
    }

    // DISPLAY SEARCH LIST
    async function displayFilterList(recipes){
        const filterSection = document.querySelector(".filter_section");
        const cardModel = cardFactory(recipes);
        const CardDOM = cardModel.getFilterList();
        filterSection.appendChild(CardDOM);       
    }

    // WHEN TEXT BUTTON IS CLICKED...
    async function filterBtnOnClick() {
        const ingredientsText = document.querySelector('.ingredients_button h2');
        const applianceText = document.querySelector('.appliance_button h2');
        const ustensilsText = document.querySelector('.ustensils_button h2');

        // When ingredient text is clicked...
        ingredientsText.addEventListener('click', function(e){
            const ingredientsBtn = document.querySelector('.ingredients_button');
            const ingredientsInput = document.querySelector('.ingredients_input');
            ingredientsBtn.style.display = 'none';
            ingredientsInput.style.display = 'flex';
        });

        // When appliance text is clicked...
        applianceText.addEventListener('click', function(e){
            const applianceBtn = document.querySelector('.appliance_button');
            const applianceInput = document.querySelector('.appliance_input');
            applianceBtn.style.display = 'none';
            applianceInput.style.display = 'flex';
        });

        // When ustensils text is clicked...
        ustensilsText.addEventListener('click', function(e){
            const ustensilsBtn = document.querySelector('.ustensils_button');
            const ustensilsInput = document.querySelector('.ustensils_input');
            ustensilsBtn.style.display = 'none';
            ustensilsInput.style.display = 'flex';
        });
    }
    
    // WHEN ICON IS CLICKED...
    async function displayFilterIconOnClick() {
        const ingredientsIcon = document.querySelector('.ingredients_button i');
        const applianceIcon = document.querySelector('.appliance_button i');
        const ustensilsIcon = document.querySelector('.ustensils_button i');


        // When ingredient icon is clicked...
        ingredientsIcon.addEventListener('click', function(e){
            const ingredientsBtn = document.querySelector('.ingredients_button');
            const ingredientsInput = document.querySelector('ingredients_input');
            const ingredientsList = document.querySelector('.ingredients_list');

            ingredientsBtn.style.display = 'none';
            ingredientsList.style.display = 'flex';
        });

        // When appliance icon is clicked...
        applianceIcon.addEventListener('click', function(e){
        const applianceBtn = document.querySelector('.appliance_button');
            const applianceList = document.querySelector('.appliance_list');
            applianceBtn.style.display = 'none';
            applianceList.style.display = 'flex';
        });

        // When ustensils icon is clicked...
        ustensilsIcon.addEventListener('click', function(e){
            const ustensilsBtn = document.querySelector('.ustensils_button');
            const ustensilsList = document.querySelector('.ustensils_list');
            ustensilsBtn.style.display = 'none';
            ustensilsList.style.display = 'flex';
        });
    }

    // DISPLAY RECIPES
    async function displayData(recipes) {
        const cardSection = document.querySelector(".card_section");
        recipes.forEach((recipe) => {
            const cardModel = cardFactory(recipe);
            const CardDOM = cardModel.getCardDOM();
            cardSection.appendChild(CardDOM);
        });
    };

    displayFilterBtn(recipes);
    displayFilterInput(recipes);
    displayFilterList(recipes);
    filterBtnOnClick();
    displayFilterIconOnClick();
    displayData(recipes);
};
    
init();