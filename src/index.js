// import delegate from 'delegate'
import './index.css';
import 'deque-pattern-library/dist/css/pattern-library.min.css';
import 'deque-pattern-library/dist/js/pattern-library.min.js';

const editButton = document.querySelector('.Edit');

editButton.addEventListener('click', () => {
  alert('TODO: Build the accessible edit recipe modal! Good luck!');
});

/**
 * Example delegated modal keydown listener
 * NOTE: For this to work, uncomment out lines 20-22 (and line 1!)
 * and add the following to the index.html file:
 * ```html
 * <div class="Modal">MODAL CONTENT GOES HERE</div>
 * ```
 */
// delegate('.Modal', 'keydown', e => {
//   console.log('Keydown on modal child element: ', e.target);
// });

/**
 * Here is an example recipe object:
    {
      "name": "Chocolate Cake",
      "date": "11/17/2018",
      "cookCount": 4,
      "image": "/food/cake.png",
      "prepTime": "20 min",
      "cookTime": "30 min",
      "difficulty": "Beginner",
      "greaseFireCount": 2,
      "yumminess": 42,
      "ingredients": [
        "2 cups white sugar",
        "1 3/4 cups of all-purpose flour",
        "3/4 cup unsweetened cocoa powder",
        "1 1/2 teaspoons baking powder",
        "1 1/2 teaspoons baking soda",
        "1 teaspoon of salt",
        "2 eggs",
        "1 cup milk",
        "1/2 cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup boiling water"
      ],
      "instructions": [
        "Preheat oven to 350 degrees F (175 degrees C)",
        "In a large bowl, stir together the sugar, flour, cocoa, baking poweder, baking soda and salt. Add the eggs, milk, oil and vanilla, mix for 2 mins on medium speed of mixer. Stir in the boiling water last. Batter will be thin. Pour evenly into prepared pans.",
        "Bake 30 to 35 minutes in the preheated oven, until the cake tests done with a toothpick. Cool in the pans for 10 minutes, then remove to a wire rack to completely cool down."
      ]
    }
 */
