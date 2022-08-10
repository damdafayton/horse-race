import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useRaceDataQuery } from '../../app/api';

export default function Horses() {
  const { data, error } = useRaceDataQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return <div>HI</div>;
}
