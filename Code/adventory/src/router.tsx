/**
 * router.tsx — React Router configuration.
 * Maps all mega-menu items to their routes using PlaceholderPage.
 */
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { FaqPage } from './pages/FaqPage';
import { AuthPage } from './pages/AuthPage';

const routes = [
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      // Product routes
      { path: 'product/overview', element: <PlaceholderPage /> },
      { path: 'product/data-layer', element: <PlaceholderPage /> },
      { path: 'product/diagnosis', element: <PlaceholderPage /> },
      { path: 'product/decision', element: <PlaceholderPage /> },
      { path: 'product/execution', element: <PlaceholderPage /> },
      { path: 'product/integrations', element: <PlaceholderPage /> },
      // Value routes
      { path: 'value/why-performance-moved', element: <PlaceholderPage /> },
      { path: 'value/stop-promoting-oos', element: <PlaceholderPage /> },
      { path: 'value/grow-profitably', element: <PlaceholderPage /> },
      // Solutions routes
      { path: 'solutions/marketing', element: <PlaceholderPage /> },
      { path: 'solutions/finance', element: <PlaceholderPage /> },
      { path: 'solutions/operations', element: <PlaceholderPage /> },
      { path: 'solutions/scaling-d2c', element: <PlaceholderPage /> },
      { path: 'solutions/multichannel', element: <PlaceholderPage /> },
      { path: 'solutions/portfolio', element: <PlaceholderPage /> },
      { path: 'solutions/agency', element: <PlaceholderPage /> },
      // Customer routes
      { path: 'customers/stories', element: <PlaceholderPage /> },
      { path: 'customers/reviews', element: <PlaceholderPage /> },
      // FAQ route
      { path: 'faq', element: <FaqPage /> },
      // Catch-all
      { path: '*', element: <PlaceholderPage /> },
    ],
  },
];

const isStandaloneOrFile = typeof window !== 'undefined' && (window.location.protocol === 'file:' || !window.location.host);

export const router = isStandaloneOrFile ? createHashRouter(routes) : createBrowserRouter(routes);
