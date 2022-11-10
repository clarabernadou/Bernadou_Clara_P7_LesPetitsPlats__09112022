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


        // Show in page
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
    }

    function getFilterBtn() {
        // Create filter buttons
        const container = document.createElement('div');
        const ingredients = document.createElement('button');
        const text = document.createElement('h2');
        const icon = document.createElement('i');
        const appliance = document.createElement('button');
        const text2 = document.createElement('h2');
        const icon2 = document.createElement('i');
        const ustensils = document.createElement('button');
        const text3 = document.createElement('h2');
        const icon3 = document.createElement('i');

        // Buttons container
        container.setAttribute('class', 'container')
            // Ingredients button
            ingredients.setAttribute('class', 'ingredients_button');
                text.textContent = "Ingredients";
                icon.setAttribute('class', 'fas fa-chevron-down');
            // Applicance button
            appliance.setAttribute('class', 'appliance_button');
                text2.textContent = "Appareils";
                icon2.setAttribute('class', 'fas fa-chevron-down');
            // Ustensils button
            ustensils.setAttribute('class', 'ustensils_button');
                text3.textContent = "Ustensiles";
                icon3.setAttribute('class', 'fas fa-chevron-down');

        // Show in page
        container.appendChild(ingredients);
            ingredients.appendChild(text);
            ingredients.appendChild(icon);
        container.appendChild(appliance);
            appliance.appendChild(text2);
            appliance.appendChild(icon2);
        container.appendChild(ustensils);
            ustensils.appendChild(text3);
            ustensils.appendChild(icon3);
        return(container)
    }

    function getFilterInput() {
        // Create filter inputs
        const container = document.createElement('div');
        const ingredients = document.createElement('button');
        const input = document.createElement('input');
        const icon = document.createElement('i');
        const appliance = document.createElement('button');
        const input2 = document.createElement('input');
        const icon2 = document.createElement('i');
        const ustensils = document.createElement('button');
        const input3 = document.createElement('input');
        const icon3 = document.createElement('i');

        // Buttons container
        container.setAttribute('class', 'container input_container')
            // Ingredients input
            ingredients.setAttribute('class', 'ingredients_input');
                icon.setAttribute('class', 'fas fa-chevron-up');
            // Applicance input
            appliance.setAttribute('class', 'appliance_input');
                icon2.setAttribute('class', 'fas fa-chevron-up');
            // Ustensils input
            ustensils.setAttribute('class', 'ustensils_input');
                icon3.setAttribute('class', 'fas fa-chevron-up');

        // Show in page
        container.appendChild(ingredients);
            ingredients.appendChild(input);
            ingredients.appendChild(icon);
        container.appendChild(appliance);
            appliance.appendChild(input2);
            appliance.appendChild(icon2);
        container.appendChild(ustensils);
            ustensils.appendChild(input3);
            ustensils.appendChild(icon3);
        return(container)
    }

    function getFilterList() {
        // Create filter inputs
        const container = document.createElement('div');
        const ingredients = document.createElement('button');
        const text = document.createElement('h2');
        const icon = document.createElement('i');
        const appliance = document.createElement('button');
        const text2 = document.createElement('h2');
        const icon2 = document.createElement('i');
        const ustensils = document.createElement('button');
        const text3 = document.createElement('h2');
        const icon3 = document.createElement('i');

        // Buttons container
        container.setAttribute('class', 'container list_container')
            // Ingredients input
            ingredients.setAttribute('class', 'ingredients_list');
                text.textContent = "Rechercher un ingrédient"
                icon.setAttribute('class', 'fas fa-chevron-up');
            // Applicance input
            appliance.setAttribute('class', 'appliance_list');
                text2.textContent = "Rechecher un appareil"
                icon2.setAttribute('class', 'fas fa-chevron-up');
            // Ustensils input
            ustensils.setAttribute('class', 'ustensils_list');
                text3.textContent = "Rechercher un ustensile"
                icon3.setAttribute('class', 'fas fa-chevron-up');

        // Show in page
        container.appendChild(ingredients);
            ingredients.appendChild(text);
            ingredients.appendChild(icon);
        container.appendChild(appliance);
            appliance.appendChild(text2);
            appliance.appendChild(icon2);
        container.appendChild(ustensils);
            ustensils.appendChild(text3);
            ustensils.appendChild(icon3);
        return(container)
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getCardDOM, getFilterBtn, getFilterInput, getFilterList }
}