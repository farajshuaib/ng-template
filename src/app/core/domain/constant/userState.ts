export enum UserState {
  Disalbed, Enabled, All
}


export const userStateOptions = [
  {
    name: 'غير فعال',
    value: UserState.Disalbed
  },
  {
    name: 'فعال',
    value: UserState.Enabled
  },
  {
    name: 'الكل',
    value: UserState.All
  },
]


export const getUserStateName = (state: UserState) => {
  return userStateOptions.find((option) => option.value === state)?.name;
}
