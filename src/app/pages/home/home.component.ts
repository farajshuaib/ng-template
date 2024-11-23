import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {PageTitleComponent} from "../../core/application/component/page-title/page-title.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppContainerComponent} from "../../core/application/component/app-container/app-container.component";
import {NgxEchartsDirective, provideEcharts, ThemeOption} from "ngx-echarts";
import {EChartsOption} from "echarts";
import {TableComponent} from "../../core/application/component/table/table.component";
import {CoolTheme} from "./chart-theme";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageTitleComponent,
    ReactiveFormsModule,
    FormsModule,
    AppContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    provideEcharts(),
  ]
})
export class HomeComponent implements OnInit {
  protected charts = signal<EChartsOption[]>([]);
  protected theme: string | ThemeOption = CoolTheme;

  constructor() {

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {


  }


}
