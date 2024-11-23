import { Routes} from '@angular/router';
import {HomeComponent} from '../../../pages/home/home.component';
import {RoutesName} from "../../domain/constant/ERoutesName";
import {ViewUsersComponent} from "../../../pages/users/view-users/view-users.component";
import {CreateUserComponent} from "../../../pages/users/create-user/create-user.component";
import {UpdateUsersComponent} from "../../../pages/users/update-users/update-users.component";

export const MainLayoutRoutes: Routes = [
  {
    path: RoutesName.DASHBOARD,
    title: 'الرئيسية',
    component: HomeComponent,
    data: {
      icon: 'bx bx-home',
      breadcrumb: [
        {
          title: 'الرئيسية',
          path: [''],
        },
      ],
    },
  },
  {
    path: RoutesName.USERS,
    title: 'المستخدمين',
    data: {
      icon: 'bx bx-user',
      breadcrumb: [
        {
          title: 'الرئيسية',
          path: [''],
        },
        {
          title: 'المستخدمين',
          path: [RoutesName.USERS],
        },
      ],
    },
    children: [
      {
        path: '',
        title: 'المستخدمين',
        component: ViewUsersComponent,
        data: {
          icon: 'bx bx-users',
          breadcrumb: [
            {
              title: 'الرئيسية',
              path: [''],
            },
            {
              title: 'المستخدمين',
              path: [RoutesName.USERS],
            },
          ],
        },
      },
      {
        path: RoutesName.CREATE_USER,
        title: 'إضافة مستخدم',
        component: CreateUserComponent,
        data: {
          breadcrumb: [
            {
              title: 'الرئيسية',
              path: [''],
            },
            {
              title: 'المستخدمين',
              path: [RoutesName.USERS],
            },
            {
              title: 'إضافة مستخدم',
              path: [RoutesName.USERS, RoutesName.CREATE_USER],
            },
          ],
        },
      },
      {
        path: RoutesName.UPDATE_USER + '/:id',
        title: 'تعديل مستخدم',
        component: UpdateUsersComponent,
        data: {
          breadcrumb: [
            {
              title: 'الرئيسية',
              path: [''],
            },
            {
              title: 'المستخدمين',
              path: [RoutesName.USERS],
            },
            {
              title: 'تعديل مستخدم',
              path: [RoutesName.USERS, RoutesName.UPDATE_USER],
            }
          ]
        }

      }
    ]
  },
  {path: '', redirectTo: RoutesName.DASHBOARD, pathMatch: 'full'},
]
