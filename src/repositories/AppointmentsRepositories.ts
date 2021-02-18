import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const returnFindByDate = this.appointments.find(dateFinded =>
      isEqual(date, dateFinded.date),
    );
    return returnFindByDate || null;
  }
}

export default AppointmentsRepository;
