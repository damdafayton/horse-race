import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux/es/exports';

import { useRaceDataQuery } from '../../app/api';
import { endTheRace, updateLatestRaceData, setWinner } from './horsesSlice';
import styles from './Horses.module.scss';
import l1 from '../../gif/l1.gif';
import l2 from '../../gif/l2.gif';
import lMiracle from '../../gif/l_miracle.gif';
import r1 from '../../gif/r1.gif';
import r2 from '../../gif/r2.gif';
import r3 from '../../gif/r3.gif';
import config from '../../config';

const { MAX_DISTANCE } = config;

export default function Horses() {
  const { data, error } = useRaceDataQuery();

  const { maxWidth, latestRaceData, isRaceEnded, winner } = useSelector(
    (state) => state.horses
  );

  const dispatch = useDispatch();

  const horses = [
    {
      gif: l1,
      style: 'rotateHorse',
    },
    { gif: l2, style: 'rotateHorse' },
    {
      gif: lMiracle,
      style: 'rotateHorse',
    },
    {
      gif: r1,
      style: 'horses',
    },
    {
      gif: r2,
      style: 'horses',
    },
    {
      gif: r3,
      style: 'horses',
    },
  ];

  useEffect(() => {
    console.log({ data });

    if (isRaceEnded || !data || !data.length) {
      return;
    }

    const lastData = data[data.length - 1];

    let _winner = lastData.filter((horse) => horse.distance >= MAX_DISTANCE);
    _winner = _winner[0];

    // If any horse ends the race dont update latest data anymore.
    // So horses will stop.
    if (_winner) {
      // Add gif and styling data
      _winner = { ..._winner, ...horses[lastData.indexOf(_winner)] };

      dispatch(endTheRace());
      dispatch(setWinner(_winner));
      return;
    }

    dispatch(updateLatestRaceData(lastData));
  }, [data]);

  return (
    <section className="mb-3">
      <div className="d-flex flex-column text-start">
        {latestRaceData &&
          latestRaceData.map((horse, idx) => (
            <div key={`${horse.name}`}>
              <h2 className={styles.names}>{horse.name}</h2>
              <img
                alt="horse"
                src={horses[idx].gif}
                style={{
                  maxWidth: `${maxWidth}vw`,
                  // 3 rem extra space left in case vertical scroolbar is visible
                  marginLeft: `${
                    ((100 - maxWidth) * horse.distance) / MAX_DISTANCE - 2
                  }vw`,
                }}
                className={styles[horses[idx].style]}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
