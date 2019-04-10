import cake from './img/food/cake.png';
import burger from './img/food/burger.png';
import grilledCheese from './img/food/grilled_cheese.png';
// import egg from '../img/icons/egg.svg';
// import fire from '../img/icons/fire.svg';
// import recipe from '../img/icons/recipe.svg';

export const STORAGE_KEY = 'smashing-recipes';
// default data (the initial state of the fake database of recipes)
const data = [
  {
    name: 'Chocolate Cake',
    date: '11/17/2018',
    cookCount: 1,
    image: cake,
    prepTime: '20 min',
    cookTime: '30 min',
    difficulty: 'Intermediate',
    causedGreaseFire: false,
    yumminess: 50,
    ingredients: [
      '2 cups white sugar',
      '1 3/4 cups of all-purpose flour',
      '3/4 cup unsweetened cocoa powder',
      '1 1/2 teaspoons baking powder',
      '1 1/2 teaspoons baking soda',
      '1 teaspoon of salt',
      '2 eggs',
      '1 cup milk',
      '1/2 cup vegetable oil',
      '2 teaspoons vanilla extract',
      '1 cup boiling water'
    ],
    instructions: [
      'Preheat oven to 350 degrees F (175 degrees C)',
      'In a large bowl, stir together the sugar, flour, cocoa, baking poweder, baking soda and salt. Add the eggs, milk, oil and vanilla, mix for 2 mins on medium speed of mixer. Stir in the boiling water last. Batter will be thin. Pour evenly into prepared pans.',
      'Bake 30 to 35 minutes in the preheated oven, until the cake tests done with a toothpick. Cool in the pans for 10 minutes, then remove to a wire rack to completely cool down.'
    ]
  },
  {
    name: 'Mega Burger',
    date: '12/12/2018',
    cookCount: 3,
    image: burger,
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Beginner',
    causedGreaseFire: true,
    yumminess: 37,
    ingredients: [
      '1 / 2 cup Heinz Tomato Ketchup',
      '1 Tbsp.chili powder',
      '2 Tbsp.Heinz 57 Sauce Original',
      '1 Tbsp.Lea & Perrins Worcestershire Sauce',
      '1 / 2 tsp.each dried oregano leaves and ground cumin',
      '1 lb. (450 g) extra - lean ground beef',
      '1 / 3 cup fresh bread crumbs',
      '1 egg, beaten',
      '4 Cracker Barrel Monterey Jack with Jalapeno Natural Cheese Slices',
      '4 onion sandwich buns',
      '1 beefsteak tomato, cut into 4 slices'
    ],
    instructions: [
      'Heat greased barbecue to medium heat.',
      'Mix ketchup, 57 sauce, Worcestershire sauce and dry seasonings in large bowl until blended. Remove half the ketchup mixture; reserve for later use.Add meat, bread crumbs and egg to remaining ketchup mixture; mix just until blended, Shape into 4(1/ 2 - inch - thick) patties.',
      'Grill 3 min.on each side.Remove half the reserved ketchup mixture; set aside. Brush burgers with remaining ketchup mixture.Grill 5 min.or until done(160ºF), turning and brushing with reserved ketchup mixture after 3 min.',
      'Top burgers with cheese; place buns, cut sides down, on barbecue grate.Grill 1 min. or until cheese is melted and buns are lightly toasted.',
      'Place cheeseburgers on bottom halves of buns; top with tomatoes.Cover with tops of buns.'
    ]
  },
  {
    name: 'Grilled Cheese',
    date: '04/09/2019',
    cookCount: 0,
    image: grilledCheese,
    prepTime: '2 min',
    cookTime: '8 min',
    difficulty: 'Beginner',
    causedGreaseFire: true,
    yumminess: 44,
    ingredients: [
      '4 slices white American cheese',
      '8 slices country white bread',
      '4 slices yellow American cheese',
      'Salted butter, softened'
    ],
    instructions: [
      'Preheat the griddle to medium heat.',
      'Build the sandwiches with 1 slice of white cheese on 4 pieces of bread and 1 slice of yellow cheese on the other 4 slices of bread. Close the sandwiches and butter both sides. Place on the griddle; cover with a metal bowl and let the sandwiches get a nice golden brown, 2 to 3 minutes. Flip, cover again and cook until the cheese is melted and the sandwiches are golden brown, 2 to 3 minutes.'
    ]
  }
];

/**
 * Gets the recipe data, prioritizing localStorage over static data
 */
export const getData = () => {
  const storageData = localStorage.getItem(STORAGE_KEY);
  return storageData ? JSON.parse(storageData) : data;
};

/**
 * Updates the recipe data (based on edits made in the app)
 */
export const setData = updated => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

/**
 * Adds updates to a specific recipe and persists it via setData
 */
export const updateRecipe = (index, updates) => {
  const data = getData();
  data[index] = {
    ...data[index],
    ...updates
  };

  setData(data);
};
