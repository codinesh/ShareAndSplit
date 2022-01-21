import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { IAppConfig } from '../types/IAppConfig'
import { IGlobalState } from '../types/IGlobalState'

export enum GlobalStateAction {
  SetPageTitle,
  SetSearchQuery,
  AppConfig,
}

export type GlobalAction =
  | { type: GlobalStateAction.SetPageTitle; title: string }
  | { type: GlobalStateAction.SetSearchQuery; searchQuery: string }
  | { type: GlobalStateAction.AppConfig; config: IAppConfig }

const initialState: IGlobalState = {
  pageTitle: '',
  appConfig: {
    cin: '',
    contactNumber: '',
    gstin: '',
    pharmacyContactNumber: '',
  },
}

const globalStateContext = createContext<IGlobalState>(initialState)
const globalDispatchContext = createContext<React.Dispatch<GlobalAction>>(
  () => {}
)

const reducer = (state: IGlobalState, action: GlobalAction): IGlobalState => {
  switch (action.type) {
    case GlobalStateAction.SetPageTitle:
      return { ...state, pageTitle: action.title }
    case GlobalStateAction.SetSearchQuery:
      return { ...state, searchQuery: action.searchQuery }
    case GlobalStateAction.AppConfig:
      return { ...state, appConfig: action.config }
    default:
      return state
  }
}

const GlobalStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<IGlobalState, GlobalAction>
  >(reducer, initialState)

  useEffect(() => {}, [])

  return (
    <globalStateContext.Provider value={state}>
      <globalDispatchContext.Provider value={dispatch}>
        {children}
      </globalDispatchContext.Provider>
    </globalStateContext.Provider>
  )
}

const useGlobalState = () => useContext(globalStateContext)
const useGlobalDispatch = () => useContext(globalDispatchContext)

export { GlobalStateProvider, useGlobalState, useGlobalDispatch }
