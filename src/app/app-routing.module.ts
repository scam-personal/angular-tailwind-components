import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgScamComponentsComponent } from './home/ng-scam-components/ng-scam-components.component';
import { CardContainerComponent } from './home/routes-to/card-container/card-container.component';
import { DatepickerContainerComponent } from './home/routes-to/datepicker-container/datepicker-container.component';

const routes: Routes = [
  { path: '', component: NgScamComponentsComponent },
  { path: 'home', component: NgScamComponentsComponent },
  { path: 'date-picker', component: DatepickerContainerComponent },
  { path: 'card', component: CardContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
