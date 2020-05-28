import MemoryToggle from './MemoryToggle';
import SplitToggle from './SplitToggle';

const getSplitToggle = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return new MemoryToggle();
  }

  return new SplitToggle();
};

export default getSplitToggle;
