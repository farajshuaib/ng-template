import {computed, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service/auth.service';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {AuthenticateDto} from "../../../domain/dto/authenticate.dto";
import {permissionState} from "./permission.state";
import {CoreContentStatus} from "../../../domain/constant/CoreContentStatus";
import {ContentState} from "../../../domain/models/contentState.model";
import {Router} from "@angular/router";
import {RoutesName} from "../../../domain/constant/ERoutesName";
import {Permission} from "../../../domain/models/permission.model";
import {PermissionService} from "../../services/permission/permission.service";
import {AssignPermissionDto} from "../../../domain/dto/assignPermission.dto";


export const permissionStore = signalStore(
  {providedIn: 'root'},
  withState(permissionState),
  withMethods((store, service = inject(PermissionService), router = inject(Router)) => ({

    async getPermissions() {
      patchState(store, {
        contentState: {message: '', status: CoreContentStatus.loading},
      });
      try {
        const response = await service.getPermissions();
        patchState(store, {
          permissions: response.content,
          contentState: {
            message: response.message,
            status: CoreContentStatus.success,
          },
        });
      } catch (e: any) {
        patchState(store, {
          contentState: {
            message: e?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.error,
          }
        });
      }
    },

    async assignPermission(request: AssignPermissionDto) {
      patchState(store, {
        contentState: {message: '', status: CoreContentStatus.loading},
      });
      try {
        const response = await service.assignPermission(request);
        patchState(store, {
          contentState: {
            message: response.message,
            status: CoreContentStatus.success,
          },
        });
      } catch (e: any) {
        patchState(store, {
          contentState: {
            message: e?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.error,
          }
        });
      }
    },

  })),


  withComputed((state) => ({
    contentState: computed(() => state.contentState() as ContentState),
  }))
);
