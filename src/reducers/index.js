import {combineReducers} from 'redux';
import modal from './modal';
import cards from './cards';

export default combineReducers({
	cards,
	modal,
});
