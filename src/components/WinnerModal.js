import { useSelector } from 'react-redux/es/exports';

import styles from './WinnerModal.module.scss';

export default function WinnerModal() {
  const { winner } = useSelector((state) => state.horses);

  return (
    winner && (
      <section className={styles.container}>
        <div className="pt-5">
          <h1 className="fs-4 text-center text-primary">WINNER</h1>
          <h1 className="mb-5 mt-2 text-center">{winner.name.toUpperCase()}</h1>
          <img style={{ maxHeight: '70%' }} src={winner.gif} />
        </div>
      </section>
    )
  );
}
