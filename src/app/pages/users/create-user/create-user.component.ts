import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserStore} from "../../../core/application/features/users/store";
import {AlertComponent} from "../../../core/application/component/alert/alert.component";
import {ButtonComponent} from "../../../core/application/component/button/button.component";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PageTitleComponent} from "../../../core/application/component/page-title/page-title.component";
import {Router} from "@angular/router";

import {InputComponent} from "../../../core/application/component/input/input.component";
import {RoutesName} from "../../../core/domain/constant/ERoutesName";
import {userRolesOptions} from "../../../core/domain/constant/UserRole";
import {SelectInputComponent} from "../../../core/application/component/select-input/select-input.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {strongPasswordRegex} from "../../../core/domain/constant/strongPasswordRegex";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    AlertComponent,
    ButtonComponent,
    FormsModule,
    PageTitleComponent,
    ReactiveFormsModule,
    InputComponent,
    SelectInputComponent
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserStore],
})
export class CreateUserComponent {
  protected store = inject(UserStore)

  constructor(private readonly router: Router, private readonly snackBar: MatSnackBar) {
  }


  protected formControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(strongPasswordRegex),
      ],
    }),
    role: new FormControl(0, {validators: [Validators.required]}),
  });


  protected async onSubmit() {
    if (!this.formControl.valid) {
      return this.formControl.markAllAsTouched();
    }

    try {
      await this.store.createUser({
        name: this.formControl.controls.name.value!,
        username: this.formControl.controls.username.value!,
        password: this.formControl.controls.password.value!,
        role: +this.formControl.controls.role.value!
      });

      this.snackBar.open('تم اضافة مستخدم بنجاح', '', {
        duration: 2000,
      });

      this.router.navigate([RoutesName.USERS]);
    } catch (e) {

    }
  }

  onCancel() {
    this.router.navigate([RoutesName.USERS]);
  }

  protected readonly userRolesOptions = userRolesOptions;
}
