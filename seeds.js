const Faker = require("faker");
const Users = require("./src/app/models/user");
const Chefs = require("./src/app/models/chef");
const Files = require("./src/app/models/file");
const Recipes = require("./src/app/models/recipe");
const crypto = require("bcryptjs");

let usersIds = [];
const totalUsers = 10;
let chefsIds = [];
const totalChefs = 10;
let recipesIds = [];
const totalRecipes = 10;

async function createUsers() {
  let i = 0;
  let password = await crypto.hash("123", 8);
  while (i < totalUsers) {
    let result = await Users.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password,
      is_admin: Math.round(Math.random()),
    });
    usersIds.push(result);
    i++;
  }
}

async function file() {
  const result = await Files.chefCreate({
    filename: "FotoChef",
    path: "/public/images/fotopadrao.jpg",
  });
  return result;
}

async function createChefs() {
  let i = 0;
  while (i < totalChefs) {
    let file_id = await file();
    let result = await Chefs.create({
      name: Faker.name.firstName(),
      file_id,
    });
    chefsIds.push(result);
    i++;
  }
}

async function createRecipes() {
  let i = 0;
  let j = 0;
  let ingredients = [];
  let preparation = [];

  while (j < 10) {
    ingredients.push(Faker.lorem.lines(1));
    preparation.push(Faker.lorem.lines(1));
    j++;
  }

  while (i < totalRecipes) {
    let results = await Recipes.create({
      chef_id: Math.floor(Math.random() * totalChefs),
      title: Faker.name.title(),
      ingredients,
      preparation,
      information: Faker.lorem.paragraph(),
      user_id: Math.ceil(Math.random() * totalUsers),
    });

    await Files.create({
      filename: Faker.name.middleName(),
      path: "/public/images/fotopadrao.jpg",
      recipeId: results,
    });

    recipesIds.push(results);
    i++;
  }
}

async function runSeed() {
  try {
    await createUsers();
    await createChefs();
    await createRecipes();
  } catch (error) {
    console.log(error);
  }
}

runSeed();
