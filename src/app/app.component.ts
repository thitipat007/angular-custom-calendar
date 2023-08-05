import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('calenderCustom') calenderCustom!: CustomCalendarComponent
  eventCustomCalendar: any[] = [
    {
      date: new Date(2023, 7, 2),
      agenda: [
        "รวม 1/16",
        "เช้า 1/16"
      ]
    },
    {
      date: new Date(2023, 7, 3),
      agenda: [
        "วันเฉลิมพระชมมพรรษาพระบาท"
      ]
    },
    {
      date: new Date(2023, 8, 20),
      agenda: [
        "รวม 1/16",
        "เช้า 1/16",
        "บ่าย 1/2"
      ]
    },
  ]

  ngOnInit(): void {

  }

  setUnSelectedDate() {
    this.calenderCustom.setUnSelectedDate()
  }

  onDateSelect(event: any) {
    const { day } = event
    if (!this.isDateWithinNext30Days(day)) {
      alert("ไม่สามารถเลือกวันเกิน 30 วัน")
      this.calenderCustom.setUnSelectedDate()
    }

    // event on update
    // this.eventCustomCalendar = [...this.eventCustomCalendar, {
    //   date: new Date(2023, 7, 10),
    //   agenda: [
    //     "รวม 1/16",
    //     "เช้า 1/16"
    //   ]
    // }]
  }

  isDateWithinNext30Days(date: Date): boolean {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return date >= today && date <= thirtyDaysFromNow;
  }
}
