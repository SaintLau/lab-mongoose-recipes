const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'The Ironhacker Long Island Ice Tea',
      level: 'Easy Peasy',
      ingredients: [
        '1 spoon of vodka',
        '1 spoon of rum',
        '1 spoon of gin',
        '1 spoon of tequila',
        '1 spoon of triple sec',
        '1 spoon of sweet and sour mix', 
        'cola',
        '1 lemon slice'
      ],
      cuisine: 'United States of America',
      dishType: 'drink',
      image: "https://tblakeraps.files.wordpress.com/2012/07/long-island-iced-tea.jpg?w=640&h=960",
      duration: 10,
      creator: 'Robert Butt',
      created: 1970
  
    }).then((recipeFromDB) => {
      console.log(`${recipeFromDB.title}`);
      Recipe.insertMany(data).then((allRecipes) => {
        allRecipes.forEach((recipe) => {
          console.log(recipe.title); 
        })
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, { $set: { duration: 100 }})
        .then(() => {
          console.log('Recipe sucessfully updated');

          Recipe.deleteOne({ title: 'Carrot Cake'})
            .then(() => {
              console.log('Carrot Cake is no longer available');

            });
        }); 
        mongoose.connection.close();
      })
      
    })
  })
    

 











  




