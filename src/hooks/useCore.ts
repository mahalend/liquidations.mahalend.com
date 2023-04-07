import {useContext} from 'react';

import {Context} from '../context/Provider';

const useCore = () => {
  const {core} = useContext(Context);
  return core;
};

export default useCore;
