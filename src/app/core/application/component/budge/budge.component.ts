import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-budge',
  standalone: true,
  imports: [],
  templateUrl: './budge.component.html',
  styleUrl: './budge.component.scss'
})
export class BudgeComponent {
  @Input() type: 'primary' | 'warning' | 'success' | 'danger' = 'primary';

}
