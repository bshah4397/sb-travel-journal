import { createBrowserRouter } from 'react-router-dom';
import { JournalPage } from '@/pages/JournalPage';

/**
 * Three shareable views of the same journal.
 *   /          → Together (shared race)
 *   /bhavya    → Bhavya's solo pages
 *   /shraddha  → Shraddha's solo pages
 */
export const router = createBrowserRouter([
  { path: '/', element: <JournalPage view="together" /> },
  { path: '/bhavya', element: <JournalPage view="bhavya" /> },
  { path: '/shraddha', element: <JournalPage view="shraddha" /> },
]);
