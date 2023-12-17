function searchFood() {
    // SWAP BETWEEN API KEYS IF YOU RUN OUT OF DAILY POINTS
    // const apiKey = "fd8a5b507c5e4b21b1237b9a9ebc54c4"; 
    // const apiKey = "8d0494705f32445c8adef352a5b2b5ec";
    const apiKey = "26c8689c6b284869b4ae48bb8b092fc9";
    // const apiKey = "3e8d7d0a1a484214a09fca5a3a7f8fb7";

    // USER FILTERS (EXCLUDE INGREDIENTS WORKS)
    const foodQuery = document.getElementById("foodQuery").value;
    const calories = document.getElementById("maxCalories").value;
    const protein = document.getElementById("minProtein").value;
    const carbs = document.getElementById("maxCarbs").value;
    const exclusions = document.getElementById('excludeIngredients').value;

    console.log(foodQuery)
    // Clear previous search results
    clearPreviousResults();
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${foodQuery}&maxCalories=${calories}
            &minProtein=${protein}&maxCarbs=${carbs}&excludeIngredients=${exclusions}`)
        .then(res => res.json())
        .then(res => {
            console.log('Search results:', res);
            if(res.totalResults == 0) {
                message = document.createElement("H1");
                message.setAttribute("id", "empty")
                text = document.createTextNode("NO RESULTS FOUND!");
                message.appendChild(text);
                document.body.appendChild(message)
                console.log(res.totalResults);
            } else {
            // LOOP THROUGH RESULTS (CHANGE res.results.length TO INDEX < 1 IF TESTING SO YOU DON'T RUN OUT OF DAILY POINTS FAST)
            for(let index = 0; index < res.results.length; index++){
                fullBox = document.createElement('div')
                fullBox.setAttribute("id", `product${index}`)
                fullBox.setAttribute("class", "recipe")

                document.body.appendChild(fullBox)
                console.log(document.getElementById(`product${index}`))
                recipe = document.getElementById(`product${index}`)
                // TEXT IN EACH BOX
                textbox = document.createElement('div')
                textbox.setAttribute("class", "summary")
                // IMAGE OF FOOD ITEM
                img = document.createElement('img');
                img.src = `${res.results[index].image}`;
                img.style.textAlign = "left"
                // ADDING TO RECIPE DIV
                recipe.appendChild(img);
                recipe.appendChild(textbox)
                // GETTING RECIPE TITLE AND SUMMARY
                recipeId = res.results[index].id
                getRecipe(recipeId, recipe, textbox, apiKey)
            }
            // ADDS CSS FILE DYNAMICALLY SO IT LOADS WITH RESULTS INSTEAD OF ALREADY BEING THERE
            var fileref = document.createElement("link");
            fileref.rel = "stylesheet";
            fileref.type = "text/css";
            fileref.href = "css/recipes.css";
            document.getElementsByTagName("head")[0].appendChild(fileref)

        }
        })
        .catch(error => console.error('Error:', error));
}

function getRecipe(recipeId, recipe, textbox, apiKey) {
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
        .then(res => res.json()) 
        .then(res => {
            // MAKE EACH RECIPE DIV LINK TO RECIPE ON NEW TAB
            recipe.addEventListener('click', function() {
                window.open(`${res.sourceUrl}`, "")
            })
            let title = document.createElement('h2')
            let url = document.createElement('p') 

            title.style.textDecoration = "underline"
            title.innerHTML = `${res.title}`
            url.innerHTML = `${res.summary}`
            textbox.appendChild(title)
            textbox.appendChild(url)
        })
}

function clearPreviousResults() {
    // Loop through and clear the contents of recipe divs
    for (let index = 0; index < 100; index++) {
        recipe = document.getElementById(`product${index}`);
        empty = document.getElementById("empty")
        if(recipe) {
            recipe.remove(); // Clear the content
        } 
        if(empty) {
            empty.remove()
        }
    }
}

function animation() {
    const button = document.getElementById('search')
    const mouseOverAnimation = () => {
        anime({
            targets: button,
            width: '90%',
            scale: {
                delay: 800,
                value: 1.05
            }, 
            duration: 1500
        })
    }

    const mouseOutAnimation = () => {
        anime({
            targets: button,
            width: '50%',
            scale: {
                delay: 800,
                value: 1
            }, 
            duration: 1500
        })
    }

    button.addEventListener('mouseover', mouseOverAnimation)
    button.addEventListener('mouseout', mouseOutAnimation)
}
window.onload=animation