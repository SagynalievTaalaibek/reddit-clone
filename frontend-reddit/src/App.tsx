import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>Reddit</header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={'Home'} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
