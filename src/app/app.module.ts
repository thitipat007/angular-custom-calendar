import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';

// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);

@NgModule({
  declarations: [	
    AppComponent,
    CustomCalendarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with your app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
