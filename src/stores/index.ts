import { shallow } from 'zustand/shallow';
import { IRootStore } from './root.store.types';
import { useRootStoreZustand } from './root.store';

type StateSelector<T, U> = (s: T) => U;


// prevent rerender component if used store prop not changed when we changing another props in another component
const useRootStore: <T>(selector: StateSelector<IRootStore, T>) => T = (selector) => useRootStoreZustand(selector, shallow);
export {
    useRootStore,
};