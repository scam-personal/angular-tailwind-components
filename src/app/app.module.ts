import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { MainContentComponent } from './home/main-content/main-content.component';
import { DatepickerContainerComponent } from './home/routes-to/datepicker-container/datepicker-container.component';
import { CardContainerComponent } from './home/routes-to/card-container/card-container.component';
import { NgScamComponentsComponent } from './home/ng-scam-components/ng-scam-components.component';
import { CardScmComponent } from './components/card-scm/card-scm.component';
import { DatepickerScmComponent } from './components/datepicker-scm/datepicker-scm.component';
import { SelectorScmComponent } from './components/selector-scm/selector-scm.component';
import { InputScmComponent } from './components/input-scm/input-scm.component';
import { FormsModule } from '@angular/forms';
import { DateParserFormatterSCM } from './components/datepicker-scm/date-format-scm';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainContentComponent,
    DatepickerContainerComponent,
    CardContainerComponent,
    NgScamComponentsComponent,
    CardScmComponent,
    DatepickerScmComponent,
    SelectorScmComponent,
    InputScmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{ provide: DateParserFormatterSCM, useClass: DateParserFormatterSCM }],
  bootstrap: [AppComponent]
})
export class AppModule { }
