import Immutable from 'immutable';
import { ADD_TODO, REMOVE_TODO } from '../constants/actionTypes';
import { guid } from '../../common/math';

const initState = Immutable.fromJS([{ title: 'learn react', id: guid() }]);

const r = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const item = Immutable.fromJS(Object.assign({}, action.payload, { id: guid() }));
      return state.push(item);
    }
    case REMOVE_TODO: {
      const index = state.findIndex(m => m.get('id') === action.id);
      if (index !== -1) {
        return state.delete(index);
      }

      return state;
    }
    default:
      return state;
  }
};

export default r;
