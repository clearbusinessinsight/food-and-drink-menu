var navSearch = document.querySelector('.form-inline');
var menu = document.querySelector('.card');
var nextBtn = document.querySelector('.flip');
var recContainer = document.querySelector('.detail');
var searchBox = document.querySelector('.search-box');

var forwardBtn = document.getElementById('forward-arrow');
var backBtn = document.getElementById('back-arrow');

var foodResults;
var foodIndex = 0

var food = document.querySelector('.foodInput');
var drink = document.querySelector('.drinkInput');

var drinkBtn = document.querySelector('.drinkBtn');
var foodBtn = document.querySelector('.foodBtn');

var savedFood = document.getElementById("saved-food");
var savedDrink = document.getElementById("saved-drink");




function saveLastRecipe() {
    // Save related form data as an object
    var userRecipe = {
        drink: drink.value,
        food: food.value,
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("userRecipe", JSON.stringify(userRecipe));
}

function renderLastRecipe() {
    // Use JSON.parse() to convert text to JavaScript object
    var lastRecipe = JSON.parse(localStorage.getItem("userRecipe"));
    // Check if data is returned, if not exit out of the function
    if (lastRecipe !== null) {
        document.getElementById("saved-food").innerHTML = lastRecipe.food;
        document.getElementById("saved-drink").innerHTML = lastRecipe.drink;
    } else {
        return;
    }
}

// drinkBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     saveLastRecipe();
//     renderLastRecipe();
// });
// foodBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     saveLastRecipe();
//     renderLastRecipe();
// });

// The init() function fires when the page is loaded 
function init() {
    // When the init function is executed, the code inside renderLastGrade function will also execute
    renderLastRecipe();
}
init();





function foodName() {

    var foodValue = document.querySelector('.foodInput').value;
    var foodApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodValue}`;

    fetch(foodApi)
        .then((response) => {
            // console.log(response);
            return response.json();
        }).then((data) => {
            // console.log(data);


            var results = data.meals

            for (var i = 0; i < results.length; i++) {
                var foodSearchName = document.createElement('h3');
                var foodsearchcontainer = document.createElement('ul')
                var foodSearchInstr = document.createElement('p');
                var foodSearchIngr = document.createElement('li');

                var ingredients = [results[0].strIngredient1, results[0].strIngredient2, results[0].strIngredient3, results[0].strIngredient4, results[0].strIngredient5]

                for (let i = 0; i < ingredients.length; i++) {

                    if (!ingredients[i]) {

                        ingredients.splice(i, 1)
                    }
                    foodSearchInstr.textContent = results[0].strInstructions;
                    foodSearchName.textContent = results[0].strMeal
                    foodSearchIngr.textContent = ingredients[i];


                    // recContainer.appendChild(foodSearchName);
                    // recContainer.appendChild(foodsearchcontainer);
                    // foodsearchcontainer.appendChild(foodSearchIngr);
                    // recContainer.appendChild(foodSearchInstr);
                }
            }
        })

}

function drinkName() {

    var drinkValue = document.querySelector('.drinkInput').value;
    var drinkApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkValue}`;

    fetch(drinkApi)
        .then((response) => {
            return response.json();
        }).then((data) => {

            var results = data.drinks

            for (var i = 0; i < results.length; i++) {
                var drinkSearchName = document.createElement('h3');
                var drinksearchcontainer = document.createElement('ul')
                var drinkSearchInstr = document.createElement('p');
                var drinkSearchIngr = document.createElement('li');

                var ingredients = [results[0].strIngredient1, results[0].strIngredient2, results[0].strIngredient3, results[0].strIngredient4, results[0].strIngredient5]

                for (let i = 0; i < ingredients.length; i++) {

                    if (!ingredients[i]) {

                        ingredients.splice(i, 1)
                    }
                    drinkSearchInstr.textContent = results[0].strInstructions;
                    drinkSearchName.textContent = results[0].strMeal
                    drinkSearchIngr.textContent = ingredients[i];

                    // if(!drinkValue){
                    //   recContainer.setAttribute('style', 'display:none');
                    // } else{
                    // recContainer.setAttribute('style', 'display:block');
                    // recContainer.appendChild(drinkSearchName);
                    // recContainer.appendChild(drinksearchcontainer);
                    // drinksearchcontainer.appendChild(drinkSearchIngr)
                    // recContainer.appendChild(drinkSearchInstr);
                    // }
                }



            }

        })
}

function foodReccomendationsList() {
    fetch('https://tasty.p.rapidapi.com/recipes/list?appid=c6b1a7a0e2msh6b58658c8689f52p1ce8e9jsn43c9547d691d', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c6b1a7a0e2msh6b58658c8689f52p1ce8e9jsn43c9547d691d',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    }).then((response) => {
        return response.json();

    }).then((data) => {
        console.log(data)
        foodResults = data.results
        console.log(data.results);
        intialFoodResult()
    })

};

function appendFoodResults(index) {
    var results = foodResults[index]
    var recipeName = document.createElement('h3');
    var recipesInstr = document.createElement('div');

    //  for(var i =0; i < results[i].instructions)

    if (!Array.isArray(results.recipes)) {

        // recipesInstr.textContent = results.instructions[0].display_text;

        // what it should be 
        // recipesInstr.innerHTML = new unordered list
        // create new ul + append it to recipesInstr
        // use for loop to iterate through results.instructions[i].display_text
        // while i >  results.instructions[i].length
        // finally append new instructions to the ul

        recipeName.textContent = results.name;
        recContainer.appendChild(recipeName);
        recContainer.appendChild(recipesInstr);

    } else {
        // recipesInstr.textContent = results.recipes[0].instructions[0].display_text;

        // what it should be 
        // recipesInstr.innerHTML = new unordered list
        // create new ul + append it to recipesInstr
        // use for loop to iterate through results.recipes[0].instructions[i].display_text
        // while i >  results.instructions[i].length
        // finally append new instructions to the ul

        recipeName.textContent = results.recipes.name;
        recContainer.appendChild(recipeName);
        recContainer.appendChild(recipesInstr);
    }
}

function increaseFoodResult() {
    foodIndex++
    appendFoodResults(foodIndex);

}

function decreaseFoodResult() {
    if (foodIndex > 0) {
        foodIndex--
        appendFoodResults(foodIndex);
    } else {
        appendFoodResults(0)
    }
}

function intialFoodResult() {
    appendFoodResults(foodIndex);
}

foodName();
drinkName();

// foodReccomendationsList();

foodBtn.addEventListener('click', function (event) {
    event.preventDefault();
    foodReccomendationsList();
});

drinkBtn.addEventListener('click', drinkName);
