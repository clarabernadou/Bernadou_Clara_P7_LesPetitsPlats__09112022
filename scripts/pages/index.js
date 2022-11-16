import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes()

async function init() {
    const { recipes } = await getRecipes();

    // DISPLAY BLUE BUTTONS
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

    // DISPLAY GREEN BUTTONS
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

    // DISPLAY RED BUTTONS
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

    // DISPLAY RECIPES
    async function displayData(recipes) {
        const cardSection = document.querySelector(".card_section");
        recipes.forEach((recipe) => {
            const cardModel = cardFactory(recipe);
            const CardDOM = cardModel.getCardDOM();
            cardSection.appendChild(CardDOM);
        });
    };

    displayBlueBtn(recipes);
        blueBtnOnClick();
    displayGreenBtn(recipes);
        greenBtnOnClick();
    displayRedBtn(recipes);
        redBtnOnClick();
    displayData(recipes);
};
    
init();