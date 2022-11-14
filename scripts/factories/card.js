export function cardFactory(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    // RECIPE CARDS
    function getCardDOM(){
        // Create card element
        const article = document.createElement('article');
        const image = document.createElement('img');
        const header = document.createElement('header');
        const name = document.createElement('h2');
        const alignIcon = document.createElement('div');
        const icon = document.createElement('i');
        const time = document.createElement('h3');
        const main = document.createElement('main');
        const ingredients = document.createElement('p');
        const description = document.createElement('p');

        // Recipe informations for filter
        article.setAttribute('class', 'recipe_card');
            article.setAttribute('data-ingredients', ingredients);
            article.setAttribute('data-appliance', appliance);
            article.setAttribute('data-ustensils', ustensils);
        // Header card content
        header.setAttribute('class', 'card_content card_header');
            name.textContent = data.name;
            icon.setAttribute('class', 'far fa-clock')
            time.textContent = data.time
        // Main card content
        main.setAttribute('class', 'card_content card_main');
            ingredients.textContent = data.ingredients;
            description.textContent = data.description;

        // Display in page
        article.appendChild(image);
        article.appendChild(header);
            header.appendChild(name);
            header.appendChild(alignIcon);
                alignIcon.appendChild(icon);
                alignIcon.appendChild(time);
        article.appendChild(main);
            main.appendChild(ingredients);
            main.appendChild(description);
        return(article);
    };

    function blueBtn(){
        const container = document.createElement('div');
        const ingredientsBtn = document.createElement('button');
        const text = document.createElement('h2');
        const iconDown = document.createElement('i');
        const containerDisplayNone = document.createElement('div');
        const ingredientsInput = document.createElement('button');
        const input = document.createElement('input');
        const iconUp = document.createElement('i');
        const ingredientsSearch = document.createElement('button');
        const textSearch = document.createElement('h2');
        const iconUp2 = document.createElement('i');

        // Container
        container.setAttribute('class', 'container')        
            // Main button
            ingredientsBtn.setAttribute('class', 'ingredients ingredients_button');
            text.textContent = "Ingredients";
            iconDown.setAttribute('class', 'fas fa-chevron-down');  
            // Container for buttons
            containerDisplayNone.setAttribute('class', 'container_display_none');
                // Search bar
                ingredientsInput.setAttribute('class', 'ingredients ingredients_input');
                iconUp.setAttribute('class', 'fas fa-chevron-up');
                // Search list
                ingredientsSearch.setAttribute('class', 'ingredients ingredients_list');
                textSearch.textContent = "Rechercher un ingrédient"
                iconUp2.setAttribute('class', 'fas fa-chevron-up');

        // Display in page
        container.appendChild(ingredientsBtn)
            ingredientsBtn.appendChild(text);
            ingredientsBtn.appendChild(iconDown);
        container.appendChild(containerDisplayNone);
            containerDisplayNone.appendChild(ingredientsInput);
                ingredientsInput.appendChild(input);
                ingredientsInput.appendChild(iconUp);
            containerDisplayNone.appendChild(ingredientsSearch);
                ingredientsSearch.appendChild(textSearch);
                ingredientsSearch.appendChild(iconUp2);
        return (container);
    }

    function greenBtn(){
        const container = document.createElement('div');
        const applianceBtn = document.createElement('button');
        const text = document.createElement('h2');
        const iconDown = document.createElement('i');
        const containerDisplayNone = document.createElement('div');
        const applianceInput = document.createElement('button');
        const input = document.createElement('input');
        const iconUp = document.createElement('i');
        const applianceSearch = document.createElement('button');
        const textSearch = document.createElement('h2');
        const iconUp2 = document.createElement('i');

        // Container
        container.setAttribute('class', 'container')
            // Main button        
            applianceBtn.setAttribute('class', 'appliance appliance_button');
            text.textContent = "Appareils";
            iconDown.setAttribute('class', 'fas fa-chevron-down');
            // Container for buttons
            containerDisplayNone.setAttribute('class', 'container_display_none');
                // Search bar
                applianceInput.setAttribute('class', 'appliance appliance_input');
                iconUp.setAttribute('class', 'fas fa-chevron-up');
                // Search list
                applianceSearch.setAttribute('class', 'appliance appliance_list');
                textSearch.textContent = "Rechercher un appareil"
                iconUp2.setAttribute('class', 'fas fa-chevron-up');

        // Display in page
        container.appendChild(applianceBtn)
            applianceBtn.appendChild(text);
            applianceBtn.appendChild(iconDown);
        container.appendChild(containerDisplayNone);
            containerDisplayNone.appendChild(applianceInput);
                applianceInput.appendChild(input);
                applianceInput.appendChild(iconUp);
            containerDisplayNone.appendChild(applianceSearch);
                applianceSearch.appendChild(textSearch);
                applianceSearch.appendChild(iconUp2);
        return (container);
    }

    function redBtn(){
        const container = document.createElement('div');
        const ustensilsBtn = document.createElement('button');
        const text = document.createElement('h2');
        const iconDown = document.createElement('i');
        const containerDisplayNone = document.createElement('div');
        const ustensilsInput = document.createElement('button');
        const input = document.createElement('input');
        const iconUp = document.createElement('i');
        const ustensilsSearch = document.createElement('button');
        const textSearch = document.createElement('h2');
        const iconUp2 = document.createElement('i');

        // Container
        container.setAttribute('class', 'container')
            // Main button        
            ustensilsBtn.setAttribute('class', 'ustensils ustensils_button');
            text.textContent = "Ustensiles";
            iconDown.setAttribute('class', 'fas fa-chevron-down');
            // Container for buttons
            containerDisplayNone.setAttribute('class', 'container_display_none');
                // Search bar
                ustensilsInput.setAttribute('class', 'ustensils ustensils_input');
                iconUp.setAttribute('class', 'fas fa-chevron-up');
                // Search list
                ustensilsSearch.setAttribute('class', 'ustensils ustensils_list');
                textSearch.textContent = "Rechercher un ustensile"
                iconUp2.setAttribute('class', 'fas fa-chevron-up');

        // Display in page
        container.appendChild(ustensilsBtn)
            ustensilsBtn.appendChild(text);
            ustensilsBtn.appendChild(iconDown);
        container.appendChild(containerDisplayNone);
            containerDisplayNone.appendChild(ustensilsInput);
                ustensilsInput.appendChild(input);
                ustensilsInput.appendChild(iconUp);
            containerDisplayNone.appendChild(ustensilsSearch);
                ustensilsSearch.appendChild(textSearch);
                ustensilsSearch.appendChild(iconUp2);
        return (container);
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getCardDOM, blueBtn, greenBtn, redBtn }
}