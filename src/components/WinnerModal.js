import { useSelector } from 'react-redux/es/exports';

import styles from './WinnerModal.module.scss';

export default function WinnerModal() {
  const { winner } = useSelector((state) => state.horses);

  return (
    winner && (
      <section className={styles.container}>
        <div className="pt-5 mt-3 d-flex flex-column align-items-center">
          <h1 className="fs-4 text-center text-primary">WINNER</h1>
          <h1 className="mb-5 mt-2 text-center">{winner.name.toUpperCase()}</h1>
          <img alt="winner" className={styles.gif} src={winner.gif} />
        </div>
      </section>
    )
  );
}
