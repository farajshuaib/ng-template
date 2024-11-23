import {Component, inject, Input} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ButtonComponent} from '../../core/application/component/button/button.component';
import {CommonModule} from '@angular/common';
import {AuthStore} from "../../core/application/features/auth/authStore";
import {AuthenticateDto} from "../../core/domain/dto/authenticate.dto";
import {AlertComponent} from "../../core/application/component/alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent, ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected store = inject(AuthStore);

  protected formControl = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
    password: new FormControl('', Validators.compose([Validators.required])),
  });

  submit() {
    if (this.formControl.invalid) {
      return this.formControl.markAllAsTouched();
    }


    this.store.login(this.formControl.value as AuthenticateDto);
  }
}
