import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

interface Day {
  id: number,
  date: string | number;
  isToday: boolean,
  isCurrentMonth: boolean,
  events: string[];
  dateValue: Date
}

interface SelectDay {
  day: string
}

interface EventOfDay {
  date: Date,
  agenda: string[]
}

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {
  @Input() events: EventOfDay[] = []
  @Output() onSelect = new EventEmitter<SelectDay>()

  weekdays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  private thaiMonths: string[] = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];
  calendar: any[] = [];
  today: Date = new Date();
  headerLabel: string = ""
  idDateSelect: number | null = null
  eventsValue: EventOfDay[] = []

  constructor() {
    this.generateCalendar(this.today);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.eventsValue = changes["events"]?.currentValue
    this.generateCalendar(this.today);
  }

  generateCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const rows = Math.ceil((firstDayOfWeek + daysInMonth) / 7);

    this.calendar = [];

    for (let i = 0; i < rows; i++) {
      const week: Day[] = [];
      for (let j = 0; j < 7; j++) {
        const day = i * 7 + j - firstDayOfWeek + 1;
        const dateOfMonth = new Date(year, month, day);
        const isCurrentMonth = dateOfMonth.getMonth() === month;

        const event: EventOfDay | undefined = this.eventsValue.find((value: any) => {
          return this.isSameDate(value?.date, dateOfMonth)
        })

        week.push({
          id: dateOfMonth.getTime(),
          date: dateOfMonth.getDate(), //isCurrentMonth ? day : '', 
          isToday: this.isSameDate(dateOfMonth, new Date),
          isCurrentMonth: isCurrentMonth,
          events: event ? event?.agenda : [],
          dateValue: dateOfMonth
        });
      }
      this.calendar.push(week);
    }

    this.setHaderLabel(month, year)
  }

  private isSameDate(date: Date, compareDate: Date): boolean {
    return date.getDate() === compareDate.getDate() &&
      date.getMonth() === compareDate.getMonth() &&
      date.getFullYear() === compareDate.getFullYear()
  }

  setHaderLabel(monthIndex: number, year: number) {
    const monthName = this.thaiMonths[monthIndex]
    const thaiYear = year + 543
    this.headerLabel = `${monthName} ${thaiYear}`
  }

  goToPreviousMonth(): void {
    this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
    this.generateCalendar(this.today);
  }

  goToNextMonth(): void {
    this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
    this.generateCalendar(this.today);
  }

  goToToday(): void {
    this.today = new Date();
    this.generateCalendar(this.today);
  }

  showEvents(day: any) {
    if (this.idDateSelect === day?.id) {
      this.idDateSelect = null
    } else {
      this.idDateSelect = day?.id
      this.onSelect.emit({
        day: day.dateValue
      })
    }
  }

  setUnSelectedDate(){
    this.idDateSelect = null
  }
}
