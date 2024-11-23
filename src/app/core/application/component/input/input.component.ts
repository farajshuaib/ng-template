import {Component, Input, OnInit} from '@angular/core';
import {
  ControlContainer,
  FormControl, FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";


export interface ValidationResult {
  [key: string]: string;
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() validationResult: ValidationResult = {};
  valueFormGroup?: FormGroup;
  valueFormControl?: FormControl;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private formControlNameDirective: FormControlName
  ) {
  }

  ngOnInit() {
    this.valueFormGroup = this.formGroupDirective.form;
    this.valueFormControl = this.formGroupDirective.getControl(this.formControlNameDirective);
  }

  get controlName(): string {
    return this.formControlNameDirective.name as string;
  }


  get listValidationResult() {
    return Object.keys(this.validationResult)
  }
}
