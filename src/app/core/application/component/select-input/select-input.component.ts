import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {ValidationResult} from "../input/input.component";
import {NgForOf, NgIf} from "@angular/common";

export type SelectOption = {
  name: string;
  value: string | number;
}[]

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() options: SelectOption = [];
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
