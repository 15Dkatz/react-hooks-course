import { NEW_MESSAGE, SET_USERNAME, REACTION_OBJECTS } from './types';

export const initialState = {
  messages: [],
  username: 'anonymous',
  reactionsMap: {}
};

const REACTION_TYPES = REACTION_OBJECTS.map(
  REACTION_OBJECT => REACTION_OBJECT.type
);

const reducer = (state, action) => {
  if (REACTION_TYPES.includes(action.type)) {
    let reactionsMap;
    const { messageId } = action.item;
    const messageReactions = state.reactionsMap[messageId];

    if (messageReactions) {
      reactionsMap = {
        ...state.reactionsMap,
        [messageId]: [...messageReactions, action.item]
      }
    } else {
      reactionsMap = {
        ...state.reactionsMap,
        [messageId]: [action.item]
      }
    }

    return { ...state, reactionsMap };
  }

  switch(action.type) {
    case NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.item] };
    case SET_USERNAME:
      return { ...state, username: action.username }
    default:
      return state;
  }
}

export default reducer;
