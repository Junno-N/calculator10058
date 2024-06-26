import { format } from 'date-fns';

import { GenreListComponent } from '../components/genre-list/genre-list.component';
import { getAuth } from 'firebase/auth';
import { TutorialService2 } from '../tutorial2/services.service';
import { Subscription, map } from 'rxjs';
import { FieldPath, Timestamp } from '@angular/fire/firestore';

import { PullTESTComponent } from '../pull-test/pull-test.component';

import { TaskbasedcalService } from '../taskbasedcal.service';
import { DataSharingService } from '../data-sharing.service';

import { ChangeDetectorRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import {
  addDays,
  addMinutes,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { TaskDetailCalComponent } from '../task-detail-cal/task-detail-cal.component';
import { RequireAuthComponent } from '../require-auth/require-auth.component';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}
import { Tutorial } from '../models/tutorial.model';


@Component({
  selector: 'app-drag-comp',
  templateUrl: './drag-comp.component.html',
  styleUrls: ['./drag-comp.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,

  providers: [
    {
      provide: CalendarEventTitleFormatter,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DragCompComponent implements OnInit, OnDestroy {

  genle: any[] = [];
  tasksByGenre: { [key: string]: any[] } = {};
  TaskListchecker: any[] = [];
  TaskListchecker2: any[] = [];
  TaskList: any[] = [];
  events: CalendarEvent[] = [];
  priorityOptions: string[] = ['高', '中', '低'];
  statusOptions: string[] = ['着手前', '着手中', '完了', '中止'];
  today = new Date();
  viewDate = new Date();
  viewMode = 'month';
  weekStartsOn: 0 = 0;
  dragToCreateActive = false;
  getted?: Tutorial[];
  days: any[] = [];
  slots: any[] = [];
  private subscriptions: Subscription[] = [];

  newEventTitle: string = '';
  newEventStart: string = '';
  newEventEnd: string = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tutorialService: TutorialService2,
    private taskbasedcalService: TaskbasedcalService,
  ) {}

  ngOnInit(): void {
    this.initDays();
    this.loadGenres(); 
  }

  loadGenres(): void {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("ユーザーが認証されていません");
      return;
    }

    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.genle = data; 
      this.test();
    });
  }

  test(): void {
    this.tasksByGenre = {};
        const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("ユーザーが認証されていません");
      return;
    }
    this.status=this.status
    if(this.status=="未完了タスクのみを表示"){this.statussort="完了"}
else{this.statussort=""}
    for (const genre of this.genle) {
      const sub = this.tutorialService.getAll().doc(genre.id).collection('taskList', ref =>
        ref.where(new FieldPath("user"), '==', user.email)
           .where(new FieldPath("status"), '!=', this.statussort)
      ).snapshotChanges().pipe(
        map(actions =>
          actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
        )
      ).subscribe(data => {
        if (!this.tasksByGenre[genre.id]) {
          this.tasksByGenre[genre.id] = [];
        }

        data.forEach(task => {
          if (!this.tasksByGenre[genre.id].some(t => t.id === task.id)) {
            this.tasksByGenre[genre.id].push(task);
          }
        });
        this.updateEvents();
      });

      this.subscriptions.push(sub);
    }
  }
statussort=""
  status=""
  updateEvents(): void {
    this.events = [];
    for (const genreId in this.tasksByGenre) {
      const tasks = this.tasksByGenre[genreId];
      tasks.forEach(task => {
        const newEvent: CalendarEvent = {
          id: task.id,
          title: task.title,
          start: task.deadlineDate.toDate(),
          end: task.deadlineDate.toDate(),
          meta: {
            genre: task.genre,
            priority: task.priority,
            status: task.status,
            tag: task.tag,
            rate: task.rate,
            taskTime:task.taskTime,
            freeText:task.freeText,
            deadline: task.deadlineDate.toDate()

          },
          actions: [
            {
              label: '',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.removeSlot(event.id);
              },
            },
          ],
        };
        this.events.push(newEvent);
      });
    }
    this.refresh();
  }

  refresh(): void {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  removeSlot(id: string | number | undefined): void {
    this.events = this.events.filter(event => event.id !== id);
  }

  ngOnDestroy(): void {

    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.tasksByGenre = {};
  }

  handleEvent(action: string, event: CalendarEvent<any>): void {

    this.taskbasedcalService.title = event.title;
    this.taskbasedcalService.genre = event.meta.genre;
    this.taskbasedcalService.status = event.meta.status;
    this.taskbasedcalService.priority = event.meta.priority;
    this.taskbasedcalService.rate = event.meta.rate;
    this.taskbasedcalService.deadline = event.meta.deadline;
    this.taskbasedcalService.taskTime = event.meta.taskTime;
    this.taskbasedcalService.freeText = event.meta.freeText;
    this.editTask();
  }

  editTask(): void {

    this.router.navigate(['task/detail']);
  }

  getCurrentMonthAndYear(): string {
    return format(this.today, 'yyyy年MM月');
  }

  moveToPreviousMonth(): void {
    this.viewDate = addMonths(this.viewDate, -1); 
    this.today =addMonths(this.today, -1)
    this.refreshCalendar(); 
    
  }

  moveToNextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.today = addMonths(this.today , 1); 

    this.refreshCalendar(); 
  }

  switchToWeekView(): void {
    this.viewMode = 'week';
    this.refreshCalendar();
  }

  switchToMonthView(): void {
    this.viewMode = 'month';
    this.refreshCalendar();
  }

  private refreshCalendar() {
    if (this.viewMode === 'week') {
      this.getWeekSlots();
    } else if (this.viewMode === 'month') {
      this.getMonthSlots();
    }
    this.cdr.detectChanges();
  }

  private getWeekSlots() {
    this.slots = [];
    const currentDate = startOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });
    for (let i = 0; i < 7; i++) {
      const day = {
        date: currentDate,
        events: [] as CalendarEvent[],
      };

      this.events.forEach((event: CalendarEvent) => { 
        if (isSameDay(event.start, currentDate)) {
          day.events.push(event);
        }
      });

      this.slots.push(day);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private getMonthSlots() {
    this.slots = [];
    const currentDate = startOfMonth(this.viewDate);
    const lastDate = endOfMonth(this.viewDate);

    while (currentDate <= lastDate) {
      const day = {
        date: currentDate,
        events: [] as CalendarEvent[], 
      };

      this.events.forEach((event: CalendarEvent) => {
                if (isSameDay(event.start, currentDate)) {
          day.events.push(event);
        }
      });

      this.slots.push(day);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  initDays() {
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < this.days.length; i++) {
      let a = { day: this.days[i], time: [] };
      this.slots.push(a);
    }
  }

  startDragToCreate(segment: WeekViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement) {


    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New slot' + this.events.length,
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
      actions: [
        {
          label: '',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.removeSlot(event.id);
          },
        },
      ],
    };
    this.events = [...this.events, dragToSelectEvent];

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });


    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(mouseMoveEvent.clientY - segmentPosition.top, 30);
        const daysDiff = floorToNearest(mouseMoveEvent.clientX - segmentPosition.left, segmentPosition.width) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }
}
