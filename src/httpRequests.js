import axios from "axios";

const rootUrl = axios.create({
    baseURL: "http://localhost:4000"
});

// RECIPES REQ
const getRecipesCountWithCategory = async (categoryId) => {
    try {
        const count = await rootUrl.get(`/recipes/count/${categoryId}`);
        return count;
    } catch (error) {
        console.log(error);
    };
};
const getCurrentRecipes = async () => {
    try {
        const recipes = await rootUrl.get("/recipes/current");
        return recipes;
    } catch (error) {
        console.log(error);
    }
}
const getRecipe = async (id) => {
    try {
        const recipe = await rootUrl.get(`/recipes/${id}`);
        return recipe;
    } catch (error) {
        console.log(error);
    };
};
const getRecipesWithCategory = async (id) => {
    try {
        const recipes = await rootUrl.get(`/recipes/categoryRecipes/${id}`);
        return recipes;
    } catch (error) {
        console.log(error);
    };
};
const getRecipesWithName = async (recipeName) => {
    try {
        const recipes = await rootUrl(`/recipes/finder/${recipeName}`);
        return recipes;
    } catch (error) {
        console.log(error);
    };
};
const createRecipe = async (recipe) => {
    try {
        const newRecipe = await rootUrl.post("/recipes", recipe);
        console.log(newRecipe);
    } catch (error) {
        console.log(error);
    };
};

const deleteRecipe = async (id) => {
    try {
        const result = await rootUrl.delete(`/recipes/${id}`);
        return result;
    } catch (error) {
        console.log(error);
    };
};

const updateRecipe = async (id, newDataSet) => {
    try {
        const result = await rootUrl.put(`/recipes/${id}`, newDataSet);
        return result;
    } catch (error) {
        console.log(error);
    };
};

// CATEGORIES REQ
const getCategories = async () => {
    try {
        const categories = await rootUrl.get("/categories");
        return categories;
    } catch (error) {
        console.log(error);
    };
}
const getCategory = async (id) => {
    try {
        const category = await rootUrl.get(`/categories/${id}`);
        return category;
    } catch (error) {
        console.log(error);
    };
};


// Cuisine Req
const getCuisines = async () => {
    try {
        const cuisines = await rootUrl.get("/cuisines");
        return cuisines;
    } catch (error) {
        console.log(error);
    }
}
const getCuisine = async (id) => {
    try {
        const cuisine = await rootUrl(`/cuisines/${id}`);
        return cuisine;
    } catch (error) {
        console.log(error);
    };
};


// USER Model
const getUser = async (id) => {
    try {
        const user = await rootUrl.get(`/users/${id}`);
        return user;
    } catch (error) {
        console.log(error);
    };
};

const signUpUser = async (userInfo) => {
    try {
        const newUser = await rootUrl.post("/users/signUp", userInfo);
        return(newUser);
    } catch (error) {
        console.log(error);
    };
};
const LogOut = async (id) => {
    try {
        const message = await rootUrl.get(`/users/logout/${id}`);
        return message;
    } catch (error) {
        console.log(error);
    };
};

const signInUser = async (signInInfo) => {
    try {
        const userAccess = await rootUrl.post("/users/signIn", signInInfo);
        return userAccess;
    } catch (error) {
        console.log(error);
    };
};

const refreshAccessToken = async (id) => {
    try {
        const accessToken = await rootUrl.get(`/users/refresh/${id}`);
        return accessToken;
    } catch (error) {
        console.log(error);
    }
}


export { 
    //category
    getCategories,
    getCategory,
    //recipe
    getCurrentRecipes,
    getRecipesCountWithCategory,
    getRecipe,
    getRecipesWithCategory,
    getRecipesWithName,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    // cuisine
    getCuisines,
    getCuisine,
    // user
    getUser,
    signUpUser,
    LogOut,
    signInUser,
    refreshAccessToken
}
