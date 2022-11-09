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
            console.log(ingredients, appliance, ustensils);

        // Header card content
        header.setAttribute('class', 'card_content card_header');
            name.textContent = data.name;
            icon.setAttribute('class', 'far fa-clock')
            time.textContent = data.time

        // Main card content
        main.setAttribute('class', 'card_content card_main');
            ingredients.textContent = data.ingredients
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

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getCardDOM }
}