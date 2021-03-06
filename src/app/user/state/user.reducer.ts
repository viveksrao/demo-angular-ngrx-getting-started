import { User } from '../user';

import { UserActions, UserActionTypes } from './user.actions';

// State for this feature (User)
export interface UserState{
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

export function reducer(state = initialState, action: UserActions): UserState{
  switch(action.type){
    case UserActionTypes.MaskUserName:
      console.log('Existing State: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return{
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}