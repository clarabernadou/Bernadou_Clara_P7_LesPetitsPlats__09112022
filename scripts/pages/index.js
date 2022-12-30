import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

getRecipes() // NOTE: Cet appel est inutile tu récupère déjà les recettes dans la fonction init(), en plus ici le résultat n'est pas stocké dans une variable et donc on ne pourrait de toute façon pas l'utiliser

let uniqueIngredients;
let recipeIngredients;

function extractIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.ingredient.toLowerCase())
    })

    uniqueIngredients = [new Set(ingredients.flat())] // NOTE: tu mets le résultat de la fonction dans une variable globale, tu pourrais simplement le retourner et ne plus avoir besoin de la variable globale
};

function extractRecipeIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.ingredient.toLowerCase())
    })

    recipeIngredients = ingredients
};


// NOTE: la fonction init() se termine ligne 253, elle contient quasiment tout le code de la page
// C'est trop long et pourquoi déclarer toutes les fonctions dans le scope de init ?
// Tu peux déclarer tes fonctions au niveau global et init se contente d'appeler ce qui est nécessaire
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
        function displayRecipes(){ // NOTE: ici tu es en train de réécrire la fonction displayData(), il vaudrait mieux la réutiliser
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

        // NOTE: l'idée selon moi est que cette fonction soit la seule qui permette de filtrer les recettes
        // Peut importe que le filtre soit initié par un input dans la searchbar, par l'ajout d'un tag ou la suppression d'un tag
        // A chaque événement c'est cette fonction unique qui est appelée
        // La fonction doit prendre en compte l'input de la searchbar et les tags pour bien filtrer les recettes
        // Par simplicité, à chaque fois qu'on veut filtrer les recettes on repart depuis les 50 recettes initiales
        function filterByText(recipes) {
            let search = searchBar.value // NOTE: cette variable représente l'input de la searchbar
            let tags = Array.from(document.querySelectorAll(".tags")).map(t => t.textContent) // NOTE: il faut ajouter la liste des tags à prendre en compte, tu peux les lire sur la page directement avec les fonctions du DOM
            // Attention j'ai écris la ligne comme indication, je n'ai pas écrit quelque chose de fonctionnel
            // L'idée est de se retrouver avec un array de tags, expl : ["sucre", "oignon"]
            // Si un tag a été supprimé de la page, il ne sera pas dans mon array de tags, aussi je n'ai plus besoin d'avoir de variable globale pour les tags

            recipesFound = recipes.filter(recipe => {
                const name = recipe.name.toLowerCase()
                const description = recipe.description.toLowerCase()
                extractIngredients(recipes) // NOTE: si la fonction extractIngredients() retournait la liste des ingrédient pour une recette tu pourrais mettre le résultat dans une variable
                return (
                    name.includes(search.toLowerCase()) || // NOTE: ici tu prends en compte l'input de la searchbar, c'est très bien
                    description.includes(search.toLowerCase()) ||
                    uniqueIngredients.includes(search.toLowerCase()) || // NOTE: ici la variable uniqueIngredients semble venir de nulle part, c'est en fait une variable globale mais tu peux t'en passer
                    tags.every(t => uniqueIngredients.includes(t)) // NOTE: j'ajoute une condition pour prendre en compte les tags. Pour chaque tag t, uniqueIngredients contient t. L'idéale serait de remplacer uniqueIngredients par une variable locale
                )
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

        function getNewIngredients() {
            ingredientsForDisplay = new Set
            extractRecipeIngredients(recipes)

            recipeIngredients.filter(ingredients => {
                for(let ingredient of ingredients) {
                    if(ingredient.includes(tagContent)){
                        ingredientsForDisplay.add(ingredient)
                    }
                }
            console.log(ingredientsForDisplay);
            })
        }
              
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

        // NOTE: Tu as une fonction displayTag() plus haut, essaies de les laisser à côté pour faciliter la lecture
        function removeTag() {
            const removeTags = document.querySelectorAll('.fa-times-circle');
            for(let removeTag of removeTags) {
                removeTag.addEventListener('click', function(e){
                    let btn = e.target.closest("div")
                    let ingredient = btn.querySelector('p').innerText;
                    // let remove = tagsArray.filter(tag => tag == ingredient)
                    let index = tagsArray.findIndex(tag => tag == ingredient)
                    delete tagsArray[index] // NOTE: l'idée ici serait de uniquement supprimer le tag du DOM et de ne pas chercher à modifier l'état d'une variable globale
                    btn.remove()
                    console.log(tagsArray);
                })
            }
        }

        // ⬇️⬇️⬇️ HERE ⬇️⬇️⬇️
        function filterRecipes(recipes) {
            extractRecipeIngredients(recipes);
            recipeIngredients.filter(ingredient => {
                const multipleExist = tagsArray.every(tags => {
                    return ingredient.includes(tags);
                });
                console.log(multipleExist);
            })
        }

        function initSearchTags() {
            const ingredientsInList = document.querySelectorAll('.ingredient-in-list');
            for(let ingredientInList of ingredientsInList) {
                ingredientInList.addEventListener('click', function(e){
                    tagContent = ingredientInList.text
                    tagsArray.push(ingredientInList.text)
                    displayTag()
                    removeTag()
                    filterRecipes(recipes)
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