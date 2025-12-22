import { useOutletContext } from 'react-router-dom';

import type { AppContextValue } from './AppLayout';

export function useAppContext() {
  return useOutletContext<AppContextValue>();
}
