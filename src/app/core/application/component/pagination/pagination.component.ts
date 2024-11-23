import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() lastPage: number = 1;
  @Input() currentPage: number = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  setPage(page: number): void {
    const queryParams = { PageNumber: page.toString() };
    this.router.navigate([], { queryParams });
  }

  pagination(currentPage: number, pageCount: number): number[] {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const result: number[] = [];

    for (let i = 1; i <= pageCount; i++) {
      if (i >= left && i < right) {
        result.push(i);
      }
    }
    return result;
  }

  protected readonly Array = Array;
}
