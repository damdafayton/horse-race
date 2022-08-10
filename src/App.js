import { useDispatch, useSelector } from 'react-redux/es/exports';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

import WinnerModal from './components/WinnerModal';
import Horses from './features/horses/Horses';
import { zoomIn, zoomOut } from './features/horses/horsesSlice';

function App() {
  const dispatch = useDispatch();
  const { winner } = useSelector((state) => state.horses);
  const { width, height } = useWindowSize();

  return (
    <div className="App">
      <header className="App-header py-2 position-relative mb-3 px-3">
        HORSE RACING
        <span className="position-absolute end-0 gap-2">
          <button
            type="button"
            className="btn-clean text-white me-2"
            onClick={() => dispatch(zoomIn())}
          >
            <ZoomInOutlinedIcon className="h-2rem" />
          </button>
          <button
            type="button"
            className="btn-clean text-white me-2"
            onClick={() => dispatch(zoomOut())}
          >
            <ZoomOutOutlinedIcon className="h-2rem" />
          </button>
        </span>
      </header>
      <main>
        <Horses />
      </main>
      {winner && (
        <>
          <Confetti width={width - 20} height={height} />
          <WinnerModal />
        </>
      )}
    </div>
  );
}

export default App;
