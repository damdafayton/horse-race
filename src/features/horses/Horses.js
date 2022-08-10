import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useRaceDataQuery } from '../../app/api';
import l1 from '../../gif/l1.gif';
import l2 from '../../gif/l2.gif';
import l_miracle from '../../gif/l_miracle.gif';
import r1 from '../../gif/r1.gif';
import r2 from '../../gif/r2.gif';
import r3 from '../../gif/r3.gif';
import styles from './Horses.module.scss';

export default function Horses() {
  const { data, error } = useRaceDataQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <section className="">
      <div className="d-flex flex-column text-start">
        <img src={l1} className={styles.rotateHorse}></img>
        <img src={l2} className={styles.rotateHorse}></img>
        <img src={l_miracle} className={styles.rotateHorse}></img>
        <img src={r1} className={styles.horses}></img>
        <img src={r2} className={styles.horses}></img>
        <img src={r3} className={styles.horses}></img>
      </div>
    </section>
  );
}
