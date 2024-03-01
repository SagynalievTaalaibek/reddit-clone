import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import NewPost from './features/posts/NewPost';
import NotFound from './components/NotFound';
import Post from './features/posts/Post';
import OnePost from './features/posts/OnePost';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl" sx={{ mt: 1 }}>
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {user ? <Route path="/add-new-post" element={<NewPost />} /> : ''}
            <Route path="/post/:id" element={<OnePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
