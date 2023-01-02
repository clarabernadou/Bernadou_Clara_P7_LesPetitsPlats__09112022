import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

const { recipes } = await getRecipes();
console.log(recipes);

function extractAllIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.toLowerCase());
    })
    return [new Set(ingredients.flat())]
};

export function extractIngredients(recipe) {
    return recipe.ingredients.map(i => i.ingredient.toLowerCase())
}

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

        filterByText(recipes)
        cardSection.innerHTML = "";
        displayData(recipesFound)
    };

    function removeTag() {
        const removeTags = document.querySelectorAll('.fa-times-circle');
        for(let removeTag of removeTags) {
            removeTag.addEventListener('click', function(e){
                let btn = e.target.closest("div")
                btn.remove()
                filterByText(recipes)
                cardSection.innerHTML = "";
                displayData(recipesFound)
            })
        }
    }
    
    let tagContent;
    let ingredientsForDisplay = new Set
    let recipesFound

    // NOTE: l'idée selon moi est que cette fonction soit la seule qui permette de filtrer les recettes
    // Peut importe que le filtre soit initié par un input dans la searchbar, par l'ajout d'un tag ou la suppression d'un tag
    // A chaque événement c'est cette fonction unique qui est appelée
    // La fonction doit prendre en compte l'input de la searchbar et les tags pour bien filtrer les recettes
    // Par simplicité, à chaque fois qu'on veut filtrer les recettes on repart depuis les 50 recettes initiales
    function filterByText(recipes) {
        let search = searchBar.value
        let tags = Array.from(document.querySelectorAll(".tag")).map(t => t.textContent)
        console.log(tags);

        recipesFound = recipes.filter(recipe => {
            const name = recipe.name.toLowerCase()
            const description = recipe.description.toLowerCase()
            return (
                name.includes(search.toLowerCase()) ||
                description.includes(search.toLowerCase()) ||
                recipe.ingredients.includes(search.toLowerCase())
            )
        })

        if(tags.length){
            recipesFound = recipesFound.filter(recipe => {
                return tags.every(t => recipe.ingredients.includes(t))
            })
        }

        console.log(recipesFound);
        return recipesFound
    };

    function getIngredients() {
        let search = searchBarInBtn.value
        ingredientsForDisplay = new Set
        let uniqueIngredients = extractAllIngredients(recipes)

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
            let recipesFound = filterByText(recipes)

            if(search.length >= 3) {
                filterByText(recipes)
                if(recipesFound.length > 0){
                    cardSection.innerHTML = "";
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

    function initSearchTags() {
        const ingredientsInList = document.querySelectorAll('.ingredient-in-list');
        for(let ingredientInList of ingredientsInList) {
            ingredientInList.addEventListener('click', function(e){
                tagContent = ingredientInList.text
                displayTag()
                removeTag()
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

async function init() {
    displayFilterBlueBtn(recipes);
    whenBtnIsClicked();
    displayData(recipes);
    search(recipes);

};
init();