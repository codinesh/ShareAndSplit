import { IAppConfig } from './IAppConfig'

export interface IGlobalState {
  pageTitle: string
  searchQuery?: string
  appConfig: IAppConfig
}
