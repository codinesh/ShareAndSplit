export default interface PageProps<T> {
  pageContent: T
  onSearch?: (searchQuery: string) => T[] | T
}
