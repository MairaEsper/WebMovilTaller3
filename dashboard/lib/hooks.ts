// lib/hooks.ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Utilicen estos hooks en lugar de los de redux directamente
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;