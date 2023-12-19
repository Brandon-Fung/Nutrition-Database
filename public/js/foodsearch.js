function searchFood() {
    // SWAP BETWEEN API KEYS IF YOU RUN OUT OF DAILY POINTS
    // const apiKey = "fd8a5b507c5e4b21b1237b9a9ebc54c4"; 
    // const apiKey = "8d0494705f32445c8adef352a5b2b5ec";
    const apiKey = "26c8689c6b284869b4ae48bb8b092fc9";
    //const apiKey = "3e8d7d0a1a484214a09fca5a3a7f8fb7";

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

async function getFood() {
    console.log('Creating Food')
    var host = window.location.origin;
    console.log('Host:', host)
    var test = await fetch(`${host}/foodsearches`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => {
            console.log(res)

            const element = document.getElementById('errorBox')

            if (element) {
                element.remove();
            }

            console.log('Status:', res.status)
            if (res.status != 200 && res.status != 304) {
                throw new Error(JSON.stringify(res.json()));
            }
            return res.json()
        })
        .then((res) => {
            console.log(res)
            const element = document.getElementById("foodInfo");
            if (element) {
                element.remove();
            }

            var table = document.createElement('table');
            table.setAttribute('id', 'foodInfo')

            var tableTitle = document.createElement('caption')
            tableTitle.innerHTML = "<b>Search History</b> <br>"

            var tableRow = document.createElement('tr');

            var tableHeading1 = document.createElement('th');
            tableHeading1.innerHTML = "Food"
            tableRow.appendChild(tableHeading1)

            var tableHeading2 = document.createElement('th');
            tableHeading2.innerHTML = "Protein"
            tableRow.appendChild(tableHeading2)

            var tableHeading3 = document.createElement('th');
            tableHeading3.innerHTML = "Calories"
            tableRow.appendChild(tableHeading3)

            var tableHeading4 = document.createElement('th');
            tableHeading4.innerHTML = "Carbs"
            tableRow.appendChild(tableHeading4)

            table.appendChild(tableRow)
            table.appendChild(tableTitle)

            // var cutoff = document.getElementById('cutoff');
            // cutoff.insertAdjacentElement("beforebegin", table)
            document.body.appendChild(table)
            for (i = 0; i < res.length; i++) {
                var customerRow = document.createElement('tr');
                var customerFood = document.createElement('td');
                var customerProtein = document.createElement('td');
                var customerCal = document.createElement('td');
                var customerCarb = document.createElement('td');
                

                customerFood.innerHTML = res[i].food;
                customerProtein.innerHTML = res[i].food_protein;
                customerCal.innerHTML = res[i].food_cal;
                customerCarb.innerHTML = res[i].food_carb;                

                customerRow.appendChild(customerFood);
                customerRow.appendChild(customerProtein);
                customerRow.appendChild(customerCal);
                customerRow.appendChild(customerCarb);


                table.appendChild(customerRow);
            }
        })

        .catch((error) => {
            console.log('Error:', JSON.parse(error.message))
            var errorDiv = document.createElement('div');
            errorDiv.setAttribute('class', 'errorBox');
            errorDiv.setAttribute('id', 'errorBox');

            var h1 = document.createElement('h1');
            h1.innerHTML = 'Error Occured';

            var p = document.createElement('p');
            p.innerHTML = `${JSON.parse(error.message).message}`;

            errorDiv.appendChild(h1);
            errorDiv.appendChild(p);
            document.body.appendChild(errorDiv);
        })
}


async function addCustomer(){
    console.log('Creating Food')
    var host = window.location.origin;

    var test = await fetch(`${host}/foodsearch`, {
        method: 'POST',
        body: JSON.stringify({
            "foodQuery": `${document.getElementById('foodQuery').value}`,
            "minProtein": `${document.getElementById('minProtein').value}`,
            "maxCalories": `${document.getElementById('maxCalories').value}`,
            "maxCarbs": `${document.getElementById('maxCarbs').value}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    await getFood();
}

window.onload = getFood;
window.onload=animation
