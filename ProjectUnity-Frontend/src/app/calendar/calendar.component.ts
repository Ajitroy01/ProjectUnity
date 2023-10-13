import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  daysTag: HTMLElement;
  currentDate: HTMLElement;
  prevNextIcon: NodeListOf<HTMLElement>;
  constructor() {
    // Initialize the properties in the constructor.
    this.daysTag = document.createElement('div');
    this.currentDate = document.createElement('div');
    this.prevNextIcon = document.querySelectorAll('.icons span');
  }
  // Initialize date, current year, and month
  date: Date = new Date();
  currYear: number = this.date.getFullYear();
  currMonth: number = this.date.getMonth();

  // Array to store full names of all months
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  ngOnInit(): void {
    this.daysTag = document.querySelector('.days') as HTMLElement;
    this.currentDate = document.querySelector('.current-date') as HTMLElement;
    this.prevNextIcon = document.querySelectorAll(
      '.icons span'
    ) as NodeListOf<HTMLElement>;

    this.renderCalendar();

    this.prevNextIcon.forEach((icon) => {
      icon.addEventListener('click', () => {
        // Check if clicked icon is the previous icon, then decrement the current month by 1; otherwise, increment it by 1
        this.currMonth =
          icon.id === 'prev' ? this.currMonth - 1 : this.currMonth + 1;

        if (this.currMonth < 0 || this.currMonth > 11) {
          // Create a new date of the current year & month and pass it as the date value
          this.date = new Date(
            this.currYear,
            this.currMonth,
            new Date().getDate()
          );
          this.currYear = this.date.getFullYear();
          this.currMonth = this.date.getMonth();
        } else {
          this.date = new Date();
        }

        this.renderCalendar();
      });
    });
  }

  renderCalendar(): void {
    const firstDayofMonth: number = new Date(
      this.currYear,
      this.currMonth,
      1
    ).getDay();
    const lastDateofMonth: number = new Date(
      this.currYear,
      this.currMonth + 1,
      0
    ).getDate();
    const lastDayofMonth: number = new Date(
      this.currYear,
      this.currMonth,
      lastDateofMonth
    ).getDay();
    const lastDateofLastMonth: number = new Date(
      this.currYear,
      this.currMonth,
      0
    ).getDate();
    let liTag: string = '';

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday: string =
        i === this.date.getDate() &&
        this.currMonth === new Date().getMonth() &&
        this.currYear === new Date().getFullYear()
          ? 'active'
          : '';
      liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    this.currentDate.innerText = `${this.months[this.currMonth]} ${
      this.currYear
    }`;
    this.daysTag.innerHTML = liTag;
  }
}
