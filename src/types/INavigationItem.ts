export interface INavigationItem {
  name: string
  pageTitle: string
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
  path?: string
  children?: INavigationItem[]
}
