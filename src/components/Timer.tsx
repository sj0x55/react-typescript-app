import { useEffect, useState } from 'react';
import styled from 'styled-components';

type TimerProps = {
  duration: number;
  cb: () => void;
};

export const Wrapper = styled.span``;

export const Timer = ({ duration, cb }: TimerProps) => {
  if (duration <= 0) {
    duration = 0;
  }

  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      cb();

      if (duration > 0) {
        setTimeLeft(duration);
      }
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, duration, cb]);

  return <Wrapper>{timeLeft}</Wrapper>;
};
