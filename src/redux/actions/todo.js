import { ADD_TODO, REMOVE_TODO } from '../constants/actionTypes';

const add = payload => {
  return {
    type: ADD_TODO,
    payload
  };
};

const remove = id => {
  return {
    type: REMOVE_TODO,
    id
  };
};

export default {
  add,
  remove
};
