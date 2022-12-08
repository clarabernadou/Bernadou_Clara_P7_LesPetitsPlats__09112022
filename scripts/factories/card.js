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
        const ingredientsList = document.createElement('p');
        const description = document.createElement('p');

        // Recipe informations for filter
        article.setAttribute('class', 'recipe_card');
            article.setAttribute('data-id', id);
        // Header card content
        header.setAttribute('class', 'card_content card_header');
            name.textContent = data.name;
            icon.setAttribute('class', 'far fa-clock')
            time.textContent = data.time
        // Main card content
        main.setAttribute('class', 'card_content card_main');

        for(let i = 0; i < id; i ++){
            var text = new Array();
            ingredients.forEach(element => {
                let all = `${element.ingredient}: ${element.quantity} ${element.unit}\n`;
                all = all.replace(/undefined/g, "");
                text.push(all)
                ingredientsList.textContent = text.join('');
            });            
        };

        description.textContent = data.description;

        // Display in page
        article.appendChild(image);
        article.appendChild(header);
        header.appendChild(name);
        header.appendChild(alignIcon);
        alignIcon.appendChild(icon);
        alignIcon.appendChild(time);
        article.appendChild(main);
        main.appendChild(ingredientsList);
        main.appendChild(description);
        return(article);
    };

    function blueBtn(){
        const container = document.createElement('div');
        const button = document.createElement('button');
        const title = document.createElement('h2');
        const iconDown = document.createElement('i');
        
        const containerDisplayNone = document.createElement('div');

        const inputBtn = document.createElement('button');
        const input = document.createElement('input');
        const iconUp = document.createElement('i');
        const alignBtn = document.createElement('div');
        const alignSearchList = document.createElement('div');

        // Container
        container.setAttribute('class', 'container')        
            // Main button
            button.setAttribute('class', 'ingredients ingredients_button');
            title.textContent = "Ingredients";
            iconDown.setAttribute('class', 'fas fa-chevron-down');  
            // Container for buttons
            containerDisplayNone.setAttribute('class', 'container_display_none');

            // Search bar
            inputBtn.setAttribute('class', 'ingredients ingredients_input');
            alignBtn.setAttribute('class', 'align-inside-btn');
            iconUp.setAttribute('class', 'fas fa-chevron-up');
            input.setAttribute('placeholder', "Rechercher un ingrédient");
            alignSearchList.setAttribute('class', 'align-list align-search-list');

        // Display in page
        container.appendChild(button)
        button.appendChild(title);
        button.appendChild(iconDown);
        container.appendChild(containerDisplayNone);
        containerDisplayNone.appendChild(inputBtn);
        inputBtn.appendChild(alignBtn);
        alignBtn.appendChild(input);
        alignBtn.appendChild(iconUp);
        inputBtn.appendChild(alignSearchList);
        return (container);
    }

    function tag() {
        const tag = document.createElement('div');
        const text = document.createElement('p');
        const icon = document.createElement('i');
                    
        tag.setAttribute('class', 'tag blue_tag');
        text.setAttribute('class', 'text-tag');
        icon.setAttribute('class', 'far fa-times-circle');
        
        tag.appendChild(text);
        tag.appendChild(icon);
        return(tag)
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getCardDOM, blueBtn, tag }
}