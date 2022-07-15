import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from '../countDown/useCountDown';
import './CountDown.css';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Finalizaron las inscripciones!!!</span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a className="countdown-link">
        <DateTimeDisplay value={days} type={'Días'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Horas'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Minutos'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Segundos'} isDanger={false} />
      </a>
    </div>
  );
};

const CountDown = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountDown;
