import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepositories';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const findAllAppointments = appointmentsRepository.findAll();

  return res.status(200).json(findAllAppointments);
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const responseFindByDate = appointmentsRepository.findByDate(parsedDate);

  if (responseFindByDate) {
    return res.status(400).json('This date is already booked');
  }
  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.status(201).json(appointment);
});

export default appointmentsRouter;
