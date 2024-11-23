import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {Location, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RoutesRecognized} from "@angular/router";
import {Breadcrumb} from "../../../domain/abstract/Breadcrumb";
import {MainLayoutRoutes} from "../../routes/main-layout-routes";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  protected breadcrumb: WritableSignal<Breadcrumb[]> = signal([]);
  protected readonly routes = MainLayoutRoutes.filter(x => x.path);


  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {

  }


  ngOnInit() {
    this.router.events.subscribe(() => {
      this.breadcrumb.set(this.routes.find(({path}) => this.router.url.includes(path as string))
        ?.data?.['breadcrumb'] || [] as Breadcrumb[])
    });
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        console.log(data.state.root.firstChild!.data);
      }
    });


    this.route.data.subscribe((data) => {
    })

  }

}
