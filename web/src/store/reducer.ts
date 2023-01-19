import { combineReducers } from '@reduxjs/toolkit';

import repositoryReducer from '../pages/Repository/repositorySlice';

const rootReducer = combineReducers({
  repository: repositoryReducer,
});

export default rootReducer;
