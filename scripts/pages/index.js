// Import functions
import { getRecipes } from '../utils/helper.js';
import { cardFactory } from '../factories/card.js';

// Get the recipes
const { recipes } = await getRecipes();

// ⬇ Extract all elements from recipes ⬇
function extractAllIngredients(recipes) {
    let ingredients = recipes.map(recipe => {
        return recipe.ingredients.map(i => i.toLowerCase())
    })
    return [new Set(ingredients.flat())]
};

function extractAllAppliances(recipes) {
    let appliances = recipes.map(recipe => {
        return recipe.appliance.toLowerCase()
    })
    return [new Set(appliances.flat())]
};

function extractAllUstensils(recipes) {
    let ustensils = recipes.map(recipe => {
        return recipe.ustensils.map(u => u.toLowerCase())
    })
    return [new Set(ustensils.flat())]
};
// ------------------------------------------------------------
// ⬇ Extract the elements of a recipe ⬇
export function extractIngredients(recipe) {
    return recipe.ingredients.map(i => i.ingredient.toLowerCase())
}

export function extractUstensils(recipe) {
    return recipe.ustensils.map(u => u.toLowerCase())
}
// ------------------------------------------------------------
// ⬇ Add blue button in the DOM ⬇
async function displayFilterBlueBtn(recipes){
    const filterSection = document.querySelector(".filter_section");
    const cardModel = cardFactory(recipes);
    const CardDOM = cardModel.blueBtn();
    filterSection.appendChild(CardDOM);       
};

// ⬇ Add green button in the DOM ⬇
async function displayFilterGreenBtn(recipes){
    const filterSection = document.querySelector(".filter_section");
    const cardModel = cardFactory(recipes);
    const CardDOM = cardModel.greenBtn();
    filterSection.appendChild(CardDOM);       
};

// ⬇ Add red button in the DOM ⬇
async function displayFilterRedBtn(recipes){
    const filterSection = document.querySelector(".filter_section");
    const cardModel = cardFactory(recipes);
    const CardDOM = cardModel.redBtn();
    filterSection.appendChild(CardDOM);       
};
// ------------------------------------------------------------
function ingredientsFilter(){
    const button = document.querySelector('.ingredients_button');
    const searchBtn = document.querySelector('.ingredients_input');
    const buttonIconDown = document.querySelector('.ingredients_button .fa-chevron-down');
    const inputIconUp = document.querySelector('.ingredients_input .fa-chevron-up');
    const openSearchBarBtn = document.querySelector('.ingredients_button h2');

    // ⬇ Display search button ⬇
    openSearchBarBtn.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // ⬇ Display search button ⬇
    buttonIconDown.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // ⬇ Return main button ⬇
    inputIconUp.addEventListener('click', function(e){
        button.style.display = 'flex';
        searchBtn.style.display = 'none';
    });
};

function appliancesFilter(){
    const button = document.querySelector('.appliances_button');
    const searchBtn = document.querySelector('.appliances_input');
    const buttonIconDown = document.querySelector('.appliances_button .fa-chevron-down');
    const inputIconUp = document.querySelector('.appliances_input .fa-chevron-up');
    const openSearchBarBtn = document.querySelector('.appliances_button h2');

    // ⬇ Display search button ⬇
    openSearchBarBtn.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // ⬇ Display search button ⬇
    buttonIconDown.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // ⬇ Return main button ⬇
    inputIconUp.addEventListener('click', function(e){
        button.style.display = 'flex';
        searchBtn.style.display = 'none';
    });
};

function ustensilsFilter(){
    const button = document.querySelector('.ustensils_button');
    const searchBtn = document.querySelector('.ustensils_input');
    const buttonIconDown = document.querySelector('.ustensils_button .fa-chevron-down');
    const inputIconUp = document.querySelector('.ustensils_input .fa-chevron-up');
    const openSearchBarBtn = document.querySelector('.ustensils_button h2');

    // ⬇ Display search button ⬇
    openSearchBarBtn.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // ⬇ Display search button ⬇
    buttonIconDown.addEventListener('click', function(e){
        searchBtn.style.display = 'flex';
        button.style.display = 'none';
    });

    // ⬇ Return main button ⬇
    inputIconUp.addEventListener('click', function(e){
        button.style.display = 'flex';
        searchBtn.style.display = 'none';
    });
};

// ------------------------------------------------------------------------------------------------------------------

// ⬇ Display recipe cards in the DOM ⬇
async function displayData(recipes) {
    const cardSection = document.querySelector(".card_section");
    recipes.forEach((recipe) => {
        const cardModel = cardFactory(recipe);
        const CardDOM = cardModel.getCardDOM();
        cardSection.appendChild(CardDOM);
    });
};

function search(recipes) {
    const searchBar = document.querySelector('.search_bar');
    const searchIsNull = document.querySelector('.search-null');
    const cardSection = document.querySelector(".card_section");

    const searchBarInBtn = document.querySelector('.ingredients_input input');
    const searchBarInAppliancesBtn = document.querySelector('.appliances_search_input');
    const searchBarInUstensilsBtn = document.querySelector('.ustensils_search_input');

    const ingredientsList = document.querySelector('.align-ingredients-list');
    const appliancesList = document.querySelector('.align-appliances-list');
    const ustensilsList = document.querySelector('.align-ustensils-list');

    const tagSection = document.querySelector('.tag_section');

    // ⬇ Add a tag in the DOM ⬇
    function displayTag() {
        const tag = document.createElement('div');
        const text = document.createElement('p');
        const icon = document.createElement('i');
                            
        tag.setAttribute('class', 'tag');
        tag.style.backgroundColor = tagColor;
        text.setAttribute('class', 'text-ingredient-tag');
        text.textContent = tagContent; 
        icon.setAttribute('class', 'far fa-times-circle');
            
        tag.appendChild(text);
        tag.appendChild(icon);
        tagSection.appendChild(tag);

        initAllSearch()
        cardSection.innerHTML = "";
        displayData(recipesFound)
    };

    // ⬇ Delete the tag in the DOM ⬇
    function removeTag() {
        const removeTags = document.querySelectorAll('.fa-times-circle');
        for(let removeTag of removeTags) {
            removeTag.addEventListener('click', function(e){
                let btn = e.target.closest("div")
                btn.remove()
                initAllSearch()
                cardSection.innerHTML = "";
                displayData(recipesFound)
            })
        }
    }
    
    let tagContent // ⬅ The name of the ingredient that will be in the tag
    let tagColor // ⬅ To add a color to the tag
    let recipesFound // ⬅ Recipes found after a search

    let ingredientsForDisplay = new Set // ⬅ The list of ingredients to add tags
    let appliancesForDisplay = new Set // ⬅ The list of appliances to add tags
    let ustensilsForDisplay = new Set // ⬅ The list of ustensils to add tags

    let tags // ⬅ To get a array of tags

    function filterRecipes(recipes) {
        let search = searchBar.value
        tags = Array.from(document.querySelectorAll(".tag")).map(t => t.textContent)

        // ⬇ Filter recipes with the search bar ⬇
        recipesFound = recipes.filter(recipe => {
            const name = recipe.name.toLowerCase()
            const description = recipe.description.toLowerCase()
            return (
                name.includes(search.toLowerCase()) ||
                description.includes(search.toLowerCase()) ||
                recipe.ingredients.includes(search.toLowerCase())
            )
        })

        // ⬇ Filter recipes with tags ⬇
        if(tags.length){
            recipesFound = recipesFound.filter(recipe => {
                let ustensils = extractUstensils(recipe)
                return (
                    tags.every(t => recipe.ingredients.includes(t)) ||
                    tags.every(t => recipe.appliance.toLowerCase().includes(t)) ||
                    tags.every(t => ustensils.includes(t))
                )
            })
        }
        console.log(recipesFound);
        return recipesFound // ⬅ Return a array of filtered recipes
    };

// ------------------------------------------------------------------------------------------------------------------

    // ⬇ Add in a array the ingredients to add tags ⬇
    function getIngredients() {
        let search = searchBarInBtn.value
        let recipesFound = filterRecipes(recipes)
        let uniqueIngredients = extractAllIngredients(recipesFound)
        ingredientsForDisplay = new Set

        uniqueIngredients.filter(ingredients => {
            for(let ingredient of ingredients) {
                if(ingredient.includes(search.toLowerCase())) {
                    ingredient = ingredient.replace(' (ou blanc)', '')
                    ingredient = ingredient.replace(' 1% de matière grasse', '')
                    ingredient = ingredient.replace(' bretonne ou de toulouse', '')
                    ingredient = ingredient.replace(' en pépites', '')


                    console.log(ingredient);
                    ingredientsForDisplay.add(ingredient);
                }
            }
        })
    }
    
    // ⬇ Display an ingredient for tags in the DOM ⬇
    function displayIngredients() {
        ingredientsList.innerHTML = '';
        ingredientsForDisplay.forEach(ingredient => {
            const a = document.createElement('a');
            a.setAttribute('class', 'ingredient-in-list');
            a.textContent = ingredient
            ingredientsList.appendChild(a);
        })
    }

// ------------------------------------------------------------------------------------------------------------------

    function getAppliances() {
        let search = searchBarInAppliancesBtn.value
        let recipesFound = filterRecipes(recipes)
        let uniqueAppliances = extractAllAppliances(recipesFound)
        appliancesForDisplay = new Set

        uniqueAppliances.filter(appliances => {
            for(let appliance of appliances) {
                if(appliance.includes(search.toLowerCase())) {
                    appliancesForDisplay.add(appliance);
                }
            }
        })
    }

    function displayAppliances() {
        appliancesList.innerHTML = '';
        appliancesForDisplay.forEach(appliance => {
            const a = document.createElement('a');
            a.setAttribute('class', 'appliances-in-list');
            a.textContent = appliance
            appliancesList.appendChild(a);
        })
    }

// ------------------------------------------------------------------------------------------------------------------

function getUstensils() {
    let search = searchBarInUstensilsBtn.value
    let recipesFound = filterRecipes(recipes)
    let uniqueUstensils = extractAllUstensils(recipesFound)
    ustensilsForDisplay = new Set

    uniqueUstensils.filter(ustensils => {
        for(let ustensil of ustensils) {
            if(ustensil.includes(search.toLowerCase())) {
                ustensilsForDisplay.add(ustensil);
            }
        }
    })
}

function displayUstensils() {
    ustensilsList.innerHTML = '';
    ustensilsForDisplay.forEach(ustensil => {
        const a = document.createElement('a');
        a.setAttribute('class', 'ustensils-in-list');
        a.textContent = ustensil
        ustensilsList.appendChild(a);
    })
}

// ------------------------------------------------------------------------------------------------------------------

    // ⬇ Init the search with the search bar ⬇
    function initSearchBar() {
        searchBar.addEventListener('input', function(e){
            let search = searchBar.value;
            let recipesFound = filterRecipes(recipes)

            // ⬇ If the search bar contains more than 3 characters ⬇
            if(search.length >= 3) {
                initAllSearch()
                // ⬇ If there are recipes found after the search ⬇
                if(recipesFound.length){
                    cardSection.innerHTML = "";
                    searchIsNull.style.display = 'none';
                    displayData(recipesFound)
                }else{
                    cardSection.innerHTML = "";
                    searchIsNull.style.display = 'flex';
                }
            }else if(tags.length){
                cardSection.innerHTML = "";
                searchIsNull.style.display = 'none';
                displayData(recipesFound)
            }else{
                cardSection.innerHTML = "";
                searchIsNull.style.display = 'none';
                displayData(recipes);
            }
        })
    };

// ------------------------------------------------------------------------------------------------------------------

    // ⬇ Init the search with the tags ⬇
    function initSearchTags() {
        const ingredientsInList = document.querySelectorAll('.ingredient-in-list');
        for(let ingredientInList of ingredientsInList) {
            ingredientInList.addEventListener('click', function(e){
                tagContent = ingredientInList.text // ⬅ Add the ingredient name to the tag
                tagColor = '#3282F7';
                displayTag()
                removeTag()
            })
        }
    };

    function initAppliancesSearchTags() {
        const appliancesInList = document.querySelectorAll('.appliances-in-list');
        for(let applianceInList of appliancesInList) {
            applianceInList.addEventListener('click', function(e){
                tagContent = applianceInList.text
                tagColor = '#68D9A4';
                displayTag()
                removeTag()
            })
        }
    };

    function initUstensilsSearchTags() {
        const ustensilsInList = document.querySelectorAll('.ustensils-in-list');
        for(let ustensilInList of ustensilsInList) {
            ustensilInList.addEventListener('click', function(e){
                tagContent = ustensilInList.text
                tagColor = '#ED6454';
                displayTag()
                removeTag()
            })
        }
    };

// ------------------------------------------------------------------------------------------------------------------
    
    function initAllSearch() {
        filterRecipes(recipes) // ⬅ Filter the recipes

        // INGREDIENTS
        getIngredients() // ⬅ modify the list of ingredients for the tags
        displayIngredients() // ⬅ display it
        initSearchTags() // ⬅ launch the search

        // APPLIANCES
        getAppliances() // ⬅ same for appliances
        displayAppliances()
        initAppliancesSearchTags()

        // USTENSILS
        getUstensils() // ⬅ same for ustensils
        displayUstensils()
        initUstensilsSearchTags()

        console.log(tags);
    }

    function initTags() {
        // INGREDIENTS
        getIngredients() // ⬅ modify the list of ingredients for the tags
        displayIngredients() // ⬅ display it
        initSearchTags() // ⬅ launch the search
        searchBarInBtn.addEventListener('input', function(e) {
            getIngredients()
            displayIngredients()
            initSearchTags()
        })

        // APPLIANCES
        getAppliances() // ⬅ same for appliances
        displayAppliances()
        initAppliancesSearchTags()
        searchBarInAppliancesBtn.addEventListener('input', function(e){
            getAppliances()
            displayAppliances()
            initAppliancesSearchTags()
        })

        // USTENSILS
        getUstensils() // ⬅ same for ustensils
        displayUstensils()
        initUstensilsSearchTags()
        searchBarInUstensilsBtn.addEventListener('input', function(e){
            getUstensils()
            displayUstensils()
            initUstensilsSearchTags()
        })
    };
    initSearchBar();
    initTags();
};

async function init() {
    // ⬇ Tag display and operation ⬇
    displayFilterBlueBtn(recipes)
    ingredientsFilter()
    displayFilterGreenBtn(recipes)
    appliancesFilter()
    displayFilterRedBtn(recipes)
    ustensilsFilter()
        
    displayData(recipes) // ⬅ Display recipes
    search(recipes) // ⬅ Search function 
};
init();