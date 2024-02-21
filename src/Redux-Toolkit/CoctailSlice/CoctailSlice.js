import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from '../../Http/settings';

const initialState = {
  popular: [],
  infoCoctail:[],
  popularInfo: [],
  popularIngredients: [],
  popularDrink: [],
  randomIngredient: [],
  randomCoctail: [],
  alfavitinfo: [],
  search: [],
  text: "",
};

export const getPopularDrink = createAsyncThunk(
  "popular/getPopularDrink",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const coctailNumber = [
        11000, 11001, 11002, 11003, 11004, 11005, 11006, 11007
      ];
      const result = await Promise.all(
        coctailNumber.map(async (number) => {
          const result = await instance.get(`lookup.php?i=${number}`);
          return result.data.drinks
        })
      );
      const combinedCoctail = result.flat();
      dispatch(PopularDrink(combinedCoctail)); // Заменил PopularDrink на dispatch(PopularDrink(combinedCoctail))
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);


export const getinfoCoctail = createAsyncThunk(
  "infoCoctail/getinfoCoctail",
  async(elem, {rejectWithValue,dispatch}) => {
    const result = await instance.get(`lookup.php?i=${elem}`)
    dispatch(infoingredients(result.data.drinks))
  }
  );
  
  export const getPopulInfo = createAsyncThunk (
    "popularInfo/getPopulInfo",
    async(elem, {rejectWithValue,dispatch}) => {
      const result = await instance.get(`filter.php?i=${elem}`)
      dispatch(PopularInfoDrink(result.data.drinks))
    }
  );
  export const getPopularIngredients = createAsyncThunk (
    "popularIngredients/getPopularIngredients",
    async(_, {rejectWithValue,dispatch}) => {
      const result = await  instance.get(`list.php?i=list`)
        dispatch(PopularIngredient(result.data.drinks)) 
        dispatch(getRandomIngredient(result.data.drinks))  
    }
  );

  export const getPopularDrinks = createAsyncThunk (
    "popularDrink/getPopularDrinks",
    async(_, {rejectWithValue,dispatch}) => {
      try {
        const drinkNumber = [
          178371,178370,178369,178368,178367,178366,178365,178364
        ];
        const result = await Promise.all(
          drinkNumber.map(async (number) => {
            const result = await instance.get(`lookup.php?i=${number}`);
            return result.data.drinks
          })
        );
        const combinedDrink = result.flat();
        dispatch(LatestDrink(combinedDrink))
      } catch (error) {
        rejectWithValue(error.message);
      }
    }
  );
  export const getRandomCoctail = createAsyncThunk (
    "randomCoctail/getRandomCoctail",
    async (_, {rejectWithValue,dispatch}) => {
      try {
        const randome = [1,2,3,4,5,6,7,8];
        const responses  = await Promise.all(
          randome.map(() => instance.get("random.php"))
        )
        const randomCoctailsData = responses.map(
          (response) => response.data.drinks[0]
        )
        dispatch(getRandom(randomCoctailsData))
      } catch (error) {
        rejectWithValue("Error fetching random Meal", error)
      }
    }
  );
  export const getAlfavitCoctail = createAsyncThunk (
    "alfavitinfo/getAlfavitCoctail",
    async (elem, {rejectWithValue,dispatch}) => {
      const res = await instance.get(`search.php?f=${elem}`)
      dispatch(getAlfavitCoctails(res.data.drinks))
    }
  );
  export const getSearchDrinksInfo = createAsyncThunk(
    "search/getSearchDrinks",
    async(elem,{dispatch}) => {
      const result = await instance.get(`search.php?s=${elem}`)
      dispatch(getSearchDrinks(result.data.drinks))
    }
  );

 
const CoctailSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    PopularDrink: (state, action) => {
      state.popular = action.payload;
    },
    infoingredients:(state, action) => {
      state.infoCoctail = action.payload;
    },
    PopularInfoDrink: (state, action) => {
      state.popularInfo = action.payload;
    },
    PopularIngredient: (state,action) => {
      state.popularIngredients = action.payload;
    },
    LatestDrink: (state, action) => {
      state.popularDrink = action.payload;
    },
    getRandomIngredient: (state,action) => {
      state.randomIngredient = action.payload
    },
    getRandom: (state, action) => {
      state.randomCoctail = action.payload;
    },
    getAlfavitCoctails: (state,action) => {
      state.alfavitinfo = action.payload
    },
    getSearchDrinks: (state,action) => {
      state.search = action.payload
    },
    onDecription: (state,action) => {
      state.text = action.payload
    }
  },
});

export const { 
    PopularDrink,
    infoingredients,
    PopularInfoDrink,
    PopularIngredient,
    LatestDrink,
    getRandomIngredient,
    getRandom,
    getAlfavitCoctails,
    getSearchDrinks,
    onDecription,
 } = CoctailSlice.actions;

export default CoctailSlice.reducer;
