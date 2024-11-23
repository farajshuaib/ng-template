interface IDefaultQueryParams {
  page: number | undefined;
  pageSize: number | undefined;
  search: string | undefined;
}

export const DefaultQueryParams: IDefaultQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
};
