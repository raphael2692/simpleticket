import { createSlice } from '@reduxjs/toolkit'

export interface SessionState {
    sessionUser : {}
    sessionData: {}
    sessionToken: {}
    isSessionValid: boolean
  }

  const initialState: SessionState = {
    sessionUser : {},
    sessionData: {},
    sessionToken: {},
    isSessionValid: false
  }

  export const sessionReducer = createSlice({
    name: 'session',
    initialState,
    reducers: {

      setSessionUser: (state, action) => {
        state.sessionUser = action.payload.user
      },
      setSessionToken: (state, action) => {
        state.sessionToken = action.payload
      },
      setSessionData: (state, action) => {
        state.sessionData = action.payload
      }
    }
  })

  export default sessionReducer;