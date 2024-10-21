import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if(args.length > 0){
    throw new AppError(`The list command should not have any argument. You entered: "${args}"`);
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {
  const id = parseInt(args[0]);
  if(args.length !== 1 || isNaN(id)){
    throw new AppError(`The "details" command needs an id (a number). You entered: "${args}"`);
  }

  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  if(id > recipes.length){
    throw new AppError(`The recipe with id ${args} does not exist.`);
  }
  const searched = recipes.filter(i => i.id === id)[0];
  console.log(`The recipe you searched is: [${searched.id}] ${searched.name}`);
}