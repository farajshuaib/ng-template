export enum UserRole {
  Admin = 1,
  Manager,
  User
}


export const userRolesOptions = [
  {
    name: 'Admin',
    value: UserRole.Admin
  },
  {
    name: 'Manager',
    value: UserRole.Manager
  },
  {
    name: 'User',
    value: UserRole.User
  }
]


export const getUserRoleName = (role: UserRole) => {
  return userRolesOptions.find((option) => option.value === role)?.name;
}
