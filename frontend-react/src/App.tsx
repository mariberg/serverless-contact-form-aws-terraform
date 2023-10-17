import { MantineProvider, Text} from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContactPage />
  },
]);

export default function App() {
  return (
    <MantineProvider theme={{
      colorScheme: 'light',
      colors: {
          'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
      }
    }}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
