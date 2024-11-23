import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {UserStore} from "../../../core/application/features/users/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RoutesName} from "../../../core/domain/constant/ERoutesName";
import {UserRole, userRolesOptions} from '../../../core/domain/constant/UserRole';
import {AlertComponent} from "../../../core/application/component/alert/alert.component";
import {ButtonComponent} from "../../../core/application/component/button/button.component";
import {InputComponent} from "../../../core/application/component/input/input.component";
import {PageTitleComponent} from "../../../core/application/component/page-title/page-title.component";
import {SelectInputComponent} from "../../../core/application/component/select-input/select-input.component";
import {TableComponent} from "../../../core/application/component/table/table.component";
import {Permission} from "../../../core/domain/models/permission.model";
import {User} from "../../../core/domain/models/user.model";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {permissionStore} from "../../../core/application/features/permissions/permissionStore";
import {strongPasswordRegex} from "../../../core/domain/constant/strongPasswordRegex";
import {AuthStore} from "../../../core/application/features/auth/authStore";

@Component({
  selector: 'app-update-users',
  standalone: true,
  imports: [
    AlertComponent,
    ButtonComponent,
    FormsModule,
    InputComponent,
    PageTitleComponent,
    ReactiveFormsModule,
    SelectInputComponent,
    TableComponent,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './update-users.component.html',
  styleUrl: './update-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUsersComponent implements OnInit {
  protected readonly userRolesOptions = userRolesOptions;
  protected store = inject(UserStore)
  protected permissionStore = inject(permissionStore)
  protected authStore = inject(AuthStore)
  protected user: WritableSignal<User | null> = signal(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {

  }


  protected formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {
      validators: [
        Validators.minLength(8),
        Validators.pattern(strongPasswordRegex),
      ],
    }),
    role: new FormControl(0, {validators: [Validators.required]}),
  });

  ngOnInit(): void {
    const result = this.store.getUsersById(
      this.route.snapshot.params['id']
    );

    if (!result) {
      this.router.navigate([RoutesName.USERS]);
      return;
    }

    this.user.set(result);

    this.formControl.patchValue({
      name: result.name,
      username: result?.username,
      role: result?.role,
    });
  }

  protected async onSubmit() {
    if (!this.formControl.valid) {
      return this.formControl.markAllAsTouched();
    }
    try {
      await this.store.updateUser({
        id: +this.route.snapshot.params['id'],
        name: this.formControl.controls.name.value!,
        username: this.formControl.controls.username.value!,
        password: this.formControl.controls.password.value!,
        role: +this.formControl.controls.role.value!
      });

      this.snackBar.open('تم تعديل المستخدم بنجاح', '', {
        duration: 2000,
      });
      this.router.navigate([RoutesName.USERS]);
    } catch (e) {
      console.log(e)
    }
  }


  toggleAddPermission(permission: Permission) {
    this.user.set({
      ...this.user()!,
      permissions: this.user()?.permissions.some((p) => p.value === permission.value)
        ? this.user()?.permissions.filter((p) => p.value !== permission.value)!
        : [...this.user()?.permissions!, permission],
    });
  }

  onSavePermissionsChanges() {
    if (
      this.authStore.userData()?.id == this.user()?.id
      ||
      this.authStore.userData()?.role != UserRole.Admin
      ||
      this.authStore.userData()?.permissions.length == 0
    ) {
      this.snackBar.open('لا تملك صلاحية تعديل صلاحيات المستخدم', '', {
        duration: 3000,
      });
      return;
    }


    let permission = 0
    this.user()?.permissions.forEach((p) => {
      permission = permission + p.value;
    });

    this.permissionStore.assignPermission({
      userId: this.route.snapshot.params['id'],
      permission: permission,
    }).then(() => {
      this.snackBar.open('تم تحديث صلاحيات المستخدم بنجاح', '', {
        duration: 3000,
      });
    })
  }

  onCancel() {
    this.router.navigate([RoutesName.USERS]);
  }


  hasPermission(permission: Permission) {
    return this.user()?.permissions.some((p) => p.value === permission.value);
  }


}
