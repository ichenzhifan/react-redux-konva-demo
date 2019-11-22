import { bindActionCreators } from 'redux';
import actions from '../actions';

export const mapDispatchToProps = dispatch => ({
	boundActions: bindActionCreators(actions, dispatch)
});