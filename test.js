const form = document.forms["formFood"];
const inputId = document.getElementById("id");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

//
function add() {
  let idFood = document.getElementById("foodID").value;
  let nameFood = document.getElementById("foodName").value;
  let costFood = document.getElementById("foodCost").value;

  if (nameFood == "") {
    document.getElementById("name-messages").innerHTML =
      "Name is not invalid, please check !";
    nameFood = "";
  } else if (nameFood.length <= 2) {
    document.getElementById("name-messages").innerHTML =
      "Name is very short, please check !";
    nameFood = "";
  } else if (nameFood.length > 50) {
    nameFood = "";
    document.getElementById("name-messages").innerHTML =
      "Name is so long, please check !";
  } else {
    document.getElementById("name-messages").innerHTML = "";
  }
  if (costFood == "") {
    costFood = "";
    document.getElementById("cost-messages").innerHTML =
      "The cost is not invalid, please check !";
  } else {
    document.getElementById("cost-messages").innerHTML = "";
  }
  if (idFood && nameFood && costFood) {
    //
    let foods = localStorage.getItem("foods")
      ? JSON.parse(localStorage.getItem("foods"))
      : [];
    foods.push({
      idFood: idFood,
      nameFood: nameFood,
      costFood: costFood,
    });

    localStorage.setItem("foods", JSON.stringify(foods));
    this.renderListFood();
    nameFood = document.getElementById("foodName").value = "";
    costFood = document.getElementById("foodCost").value = "";
  }
}
function renderListFood() {
  document.getElementById("foodID").value = "Food ID is auto, start form 1";
  let foods = localStorage.getItem("foods")
    ? JSON.parse(localStorage.getItem("foods"))
    : [];
  if (foods === 0) {
    return false;
  }

  let listFood = `
  <tr>
    <td>Food ID</td>
    <td>FoodName</td>
    <td>Food Cost</td>
    <td>Action</td>
  </tr>
    `;
  foods.forEach((food, index) => {
    let foodID = index;
    index++;
    listFood += `
          <tr>
          <td>${index}</td>
          <td>${food.nameFood}</td>
          <td>${food.costFood}</td>
          <td>
          <a href='#' id = "edit" onclick = "editID(${foodID})" >Edit</a> | <a href='#' onclick = "deleteFood(${foodID})">Delete</a>
          </td>
        </tr>
          `;
    document.getElementById("foodID").value =
      "ID is auto, start from " + ++index;
  });

  document.getElementById("list-food").innerHTML = listFood;
}
function deleteFood(id) {
  let foods = localStorage.getItem("foods")
    ? JSON.parse(localStorage.getItem("foods"))
    : [];
  foods.splice(id, 1);
  localStorage.setItem("foods", JSON.stringify(foods));
  renderListFood();

  document.getElementById("btn-add").classList.remove("hidden");
  document.getElementById("btn-save").classList.add("hidden");
}

function editID(id) {
  let foods = localStorage.getItem("foods")
    ? JSON.parse(localStorage.getItem("foods"))
    : [];

  let food = foods[id];
  for (let name in food) {
    let idFood = (document.getElementById("foodID").value = id + 1);
    let nameFood = (document.getElementById("foodName").value =
      food["nameFood"]);
    let costFood = (document.getElementById("foodCost").value =
      food["costFood"]);
  }

  document.getElementById("btn-add").classList.add("hidden");
  document.getElementById("btn-save").classList.remove("hidden");
}

function savebyID(id) {
  let foods = localStorage.getItem("foods")
    ? JSON.parse(localStorage.getItem("foods"))
    : [];

  let idFood = document.getElementById("foodID").value;
  let nameFood = document.getElementById("foodName").value;
  let costFood = document.getElementById("foodCost").value;

  if (nameFood == "") {
    document.getElementById("name-messages").innerHTML =
      "Name is not invalid, please check !";
    nameFood = "";
  } else if (nameFood.length <= 2) {
    document.getElementById("name-messages").innerHTML =
      "Name is very short, please check !";
    nameFood = "";
  } else if (nameFood.length > 50) {
    nameFood = "";
    document.getElementById("name-messages").innerHTML =
      "Name is so long, please check !";
  } else {
    document.getElementById("name-messages").innerHTML = "";
  }
  if (costFood == "") {
    costFood = "";
    document.getElementById("cost-messages").innerHTML =
      "The cost is not invalid, please check !";
  } else {
    document.getElementById("cost-messages").innerHTML = "";
  }
  if (nameFood && costFood) {
    //
    let foods = localStorage.getItem("foods")
      ? JSON.parse(localStorage.getItem("foods"))
      : [];
    foods.splice(id, 1, {
      idFood: idFood,
      nameFood: nameFood,
      costFood: costFood,
    });
    localStorage.setItem("foods", JSON.stringify(foods));
    this.renderListFood();
    document.getElementById("btn-add").classList.remove("hidden");
    document.getElementById("btn-save").classList.add("hidden");
  }
}
