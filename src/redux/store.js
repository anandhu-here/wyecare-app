import { createStore, applyMiddleware, combineReducers,  } from 'redux';
import thunk from 'redux-thunk';
import { getData } from '../@async-storage';
import { loginReducer, registerReducer } from './reducers/authReducers';
import calendar  from './reducers/calendar';
import { calhomeReducer } from './reducers/cal_home';

import { cal_agnecy } from './reducers/cal_agency';
import { serviceChangeReducer } from './reducers/serviceChange';
import usersReducer from './reducers/userReducer';

console.log("maireee")
const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  calendar:calendar,
  cal_home:calhomeReducer,
  cal_agency:cal_agnecy,
  serviceChangeReducer:serviceChangeReducer,
  userState: usersReducer,
});

// const userData = getData();
// console.log(JSON.parse(userData), "naiii")
// const userInfoFromStorage = userData ? JSON.parse(userData) : null;

const initialState = {
  
};
const middleware = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export default store;
