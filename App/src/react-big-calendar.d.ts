declare module 'react-big-calendar' {
  import * as React from 'react';

  export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface CalendarProps<T = Event> {
    localizer: any;
    events: T[];
    startAccessor: string | ((event: T) => Date);
    endAccessor: string | ((event: T) => Date);
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export function Calendar<T = Event>(props: CalendarProps<T>): JSX.Element;

  export function dateFnsLocalizer(config: {
    format: (...args: any[]) => string;
    parse: (...args: any[]) => Date;
    startOfWeek: (...args: any[]) => Date;
    getDay: (...args: any[]) => number;
    locales: { [key: string]: Locale };
  }): any;
}
