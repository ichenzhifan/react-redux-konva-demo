import { createSelector } from 'reselect';
import {get} from 'lodash';

const todos = state => get(state, 'todo');
const getTodos = createSelector(todos, data => data);

export const mapStateToProps = state => ({
  todos: getTodos(state)
});