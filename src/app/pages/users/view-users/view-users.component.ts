import {ChangeDetectionStrategy, Component, effect, inject, OnInit} from '@angular/core';
import {UserStore} from "../../../core/application/features/users/store";
import {AppContainerComponent} from "../../../core/application/component/app-container/app-container.component";
import {CommonModule} from "@angular/common";
import {PageTitleComponent} from "../../../core/application/component/page-title/page-title.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from "../../../core/application/component/table/table.component";
import {BudgeComponent} from "../../../core/application/component/budge/budge.component";
import {getUserStateName, UserState, userStateOptions} from "../../../core/domain/constant/userState";
import {TableActionsComponent} from "../../../core/application/component/table-actions/table-actions.component";
import {Router} from "@angular/router";
import {RoutesName} from "../../../core/domain/constant/ERoutesName";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../core/application/component/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {getUserRoleName} from "../../../core/domain/constant/UserRole";

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    AppContainerComponent,
    PageTitleComponent,
    ReactiveFormsModule,
    TableComponent,
    FormsModule,
    CommonModule,
    BudgeComponent,
    TableActionsComponent
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewUsersComponent implements OnInit {
  protected readonly getUserStateName = getUserStateName;
  protected readonly getUserRoleName = getUserRoleName;
  protected readonly userStateOptions = userStateOptions;
  protected readonly UserState = UserState;

  protected store = inject(UserStore);

  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.getUsers(this.store.selectedUserState());
  }


  protected onAddClicked() {
    this.router.navigate([RoutesName.USERS, RoutesName.CREATE_USER]);
  }

  protected onEditClicked(id: number) {
    this.router.navigate([RoutesName.USERS, RoutesName.UPDATE_USER, id]);
  }

  protected changeState(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: "هل انت متأكد من تغيير حالة المستخدم؟",
        message: "هل انت متأكد من تغيير حالة المستخدم؟"
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.changeUserState(userId).then(() => {
          const snackBar = this.snackBar.open("تم تغيير حالة المستخدم بنجاح", 'تراجع', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            direction: 'rtl',
          });
          snackBar.onAction().subscribe(() => {
            this.store.changeUserState(userId).then(() => {
              this.store.getUsers(this.store.selectedUserState());
            })
          });
          this.store.getUsers(this.store.selectedUserState());
        }).catch((error: any) => {
          this.snackBar.open(error?.error?.message || "حدث خطأ أثناء تغيير حالة المستخدم", '', {
            duration: 2000,
          });

        });
      }
    });
  }


}
