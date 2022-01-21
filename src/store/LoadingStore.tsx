import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { IGlobalState } from '../types/IGlobalState'
import { ILoadingState } from '../types/ILoadingState'

export enum LoadingStateAction {
  Busy,
  Idle,
  Error,
}

export type LoadingAction =
  | { type: LoadingStateAction.Busy }
  | { type: LoadingStateAction.Idle }
  | { type: LoadingStateAction.Error; errorMessage: string }

const initialState: ILoadingState = {
  inProgress: false,
  error: false,
  errorMessge: '',
}

const loadingStateContext = createContext<ILoadingState>(initialState)
const loadingDispatchContext = createContext<React.Dispatch<LoadingAction>>(
  () => {}
)

const reducer = (
  state: ILoadingState,
  action: LoadingAction
): ILoadingState => {
  switch (action.type) {
    case LoadingStateAction.Busy:
      return { ...state, inProgress: true }
    case LoadingStateAction.Idle:
      return { ...state, inProgress: false }
    case LoadingStateAction.Error:
      return { ...state, error: true, errorMessge: action.errorMessage }
    default:
      return state
  }
}

const LoadingStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<ILoadingState, LoadingAction>
  >(reducer, initialState)

  useEffect(() => {}, [])

  return (
    <loadingStateContext.Provider value={state}>
      <loadingDispatchContext.Provider value={dispatch}>
        {children}
      </loadingDispatchContext.Provider>
    </loadingStateContext.Provider>
  )
}

const useLoadingState = () => useContext(loadingStateContext)
const useLoadingDispatch = () => useContext(loadingDispatchContext)

export { LoadingStateProvider, useLoadingState, useLoadingDispatch }
