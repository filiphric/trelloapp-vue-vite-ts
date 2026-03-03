import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/react';
import { useStore } from '@/store/store';
import { afterEach } from 'vitest';

configure({ testIdAttribute: 'data-test-id' });

const initialState = useStore.getState();

afterEach(() => {
  useStore.setState(initialState, true);
});
