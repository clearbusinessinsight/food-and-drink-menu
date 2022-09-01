var navSearch = document.querySelector('.form-inline');
var menu = document.querySelector('.card');
var nextBtn = document.querySelector('.flip');
var recContainer = document.querySelector('.detail');
var searchBox = document.querySelector('.search-box');

var foodResults;
var recipeIndex = 0;

var drinkResult;
var drinkIndex =0;

var isDrink = false;
var isFood = false;

var food = document.querySelector('.foodInput');
var drink = document.querySelector('.drinkInput');

var drinkBtn = document.querySelector('.drinkBtn');
var foodBtn = document.querySelector('.foodBtn');

var savedFood = document.getElementById("saved-food");
var savedDrink = document.getElementById("saved-drink");

var rightBtn = document.getElementById('forward-arrow');
var leftBtn = document.getElementById('back-arrow');




// function saveLastRecipe() {
//     // Save related form data as an object
//     var userRecipe = {
//         drink: drink.value,
//         food: food.value,
//     };
//     // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
//     localStorage.setItem("userRecipe", JSON.stringify(userRecipe));
// }

// function renderLastRecipe() {
//     // Use JSON.parse() to convert text to JavaScript object
//     var lastRecipe = JSON.parse(localStorage.getItem("userRecipe"));
//     // Check if data is returned, if not exit out of the function
//     if (lastRecipe !== null) {
//         document.getElementById("saved-food").innerHTML = lastRecipe.food;
//         document.getElementById("saved-drink").innerHTML = lastRecipe.drink;
//     } else {
//         return;
//     }
// }

// drinkBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     saveLastRecipe();
//     renderLastRecipe();
// });
// foodBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     // saveLastRecipe();
//     // renderLastRecipe();
// });

// // // The init() function fires when the page is loaded 
// // function init() {
// //     // When the init function is executed, the code inside renderLastGrade function will also execute
// //     renderLastRecipe();
// // }
// // init();





function foodName() {

    var foodValue = document.querySelector('.foodInput').value;
    var foodApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodValue}`;

    fetch(foodApi)
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            foodResults = data.meals;
            isDrink = false;
            isFood = true;
            intialFoodResult()
       
             })   
            }


function drinkName() {

    var drinkValue = document.querySelector('.drinkInput').value;

    var drinkApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkValue}`;

    fetch(drinkApi)
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
        drinkResults = data.drinks;
        isDrink = true;
        isFood = false;
        intialFoodResult();
        })
    }



function appendRecipeResults(index) {
    if(isDrink) {
        var results = drinkResults[index]
        var drinkSearchName = document.createElement('h2');
        var drinksearchcontainer = document.createElement('ul');
        var drinkMeasurementContainer = document.createElement('ul');
        var drinkSearchInstr = document.createElement('p');
        var drinkImage = document.createElement('img');
        var ingredientsHeader = document.createElement('h5');
        var instructionsHeader = document.createElement('h5');
       
       

      
        var ingredients = [results.strIngredient1, results.strIngredient2, results.strIngredient3, results.strIngredient4, results.strIngredient5];
        var measurements =[results.strMeasure1, results.strMeasure2, results.strMeasure3, results.strMeasure4, results.strMeasure5];

        
        recContainer.innerHTML = '';
        drinkSearchInstr.textContent = results.strInstructions;
        drinkSearchName.textContent = results.strDrink;
        drinkImage.setAttribute('src', results.strDrinkThumb);
        drinkImage.setAttribute('style', 'height:150px; width:150px');
       
        ingredientsHeader.textContent = 'Ingredients';
        instructionsHeader.textContent = 'Insturctions';
        
        for (let i = 0; i < ingredients.length; i++) {

            if (!ingredients[i]) {

                ingredients.splice(i, 1);
                break;
            }
             if(!measurements[i]){

                measurements.splice(i, 1);
                break;
             }
            var drinkMeasurements =document.createElement('li');
            var drinkSearchIngr = document.createElement('li');
            drinkSearchIngr.textContent =  measurements[i]  + '   ' + ingredients[i];
            drinksearchcontainer.appendChild(drinkSearchIngr);
            
        }
        
        recContainer.appendChild(drinkSearchName);
        recContainer.appendChild(drinkImage);
        recContainer.appendChild(ingredientsHeader)
        recContainer.appendChild(drinksearchcontainer);
        recContainer.appendChild(instructionsHeader)
        recContainer.appendChild(drinkSearchInstr);
    }
    if(isFood){
        var resultsF = foodResults[index];
        var foodSearchName = document.createElement('h3');
        var foodsearchcontainer = document.createElement('ul')
        var foodSearchInstr = document.createElement('p');   
        var foodIngredientsHeader = document.createElement('h5');
        var foodInstructionsHeader = document.createElement('h5');
        var foodImage = document.createElement('img');

        
       
        

        var ingredients = [resultsF.strIngredient1, resultsF.strIngredient2, resultsF.strIngredient3, resultsF.strIngredient4, resultsF.strIngredient5]
        var measurements =[resultsF.strMeasure1, resultsF.strMeasure2, resultsF.strMeasure3, resultsF.strMeasure4, resultsF.strMeasure5];

        

        recContainer.innerHTML = '';
        foodSearchInstr.textContent = resultsF.strInstructions;
        foodSearchName.textContent = resultsF.strMeal;
        foodImage.setAttribute('src', resultsF.strMealThumb);
        foodImage.setAttribute('style', 'height:150px; width:150px');
        
        foodIngredientsHeader.textContent = 'Ingredients';
        foodInstructionsHeader.textContent = 'Insturctions';
        

        for (let i = 0; i < ingredients.length; i++) {

            if (!ingredients[i]) {

                ingredients.splice(i, 1)
            }
            var foodSearchIngr = document.createElement('li');
            foodSearchIngr.textContent = measurements[i] + '   ' + ingredients[i];
            foodsearchcontainer.appendChild(foodSearchIngr);
            
           
        }
        
        recContainer.appendChild(foodSearchName);
        recContainer.appendChild(foodImage);
        recContainer.appendChild(foodIngredientsHeader);
        recContainer.appendChild(foodsearchcontainer);
        recContainer.appendChild(foodInstructionsHeader)
        recContainer.appendChild(foodSearchInstr);
    }         
}

function increaseFoodResult() {
    if(isFood){
        if(recipeIndex < foodResults.length - 1){
            recipeIndex++
            appendRecipeResults(recipeIndex);

        }else{
            appendRecipeResults(recipeIndex);
        }
     
    }
    if(isDrink){
        if(recipeIndex < drinkResults.length - 1){
            recipeIndex++
            appendRecipeResults(recipeIndex);

        }else{
            appendRecipeResults(recipeIndex);
        }
     
    }
}

function decreaseFoodResult() {
    if (recipeIndex > 0) {
        recipeIndex--
        appendRecipeResults(recipeIndex);
    } else {
        appendRecipeResults(0)
    }
}

function intialFoodResult() {
    appendRecipeResults(recipeIndex);
}


foodBtn.addEventListener('click', foodName);
drinkBtn.addEventListener('click', drinkName);

rightBtn.addEventListener('click', increaseFoodResult);
leftBtn.addEventListener('click', decreaseFoodResult);

 
  

  