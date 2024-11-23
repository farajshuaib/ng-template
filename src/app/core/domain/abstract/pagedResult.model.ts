export interface PagedResult<T> {
  pageResult: T[],
  totalCount: number,
  pageNumber: number,
  pageSize: number,
  totalPages: number
}
