import { NavLink } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button variant="contained" component={NavLink} to="/register" sx={{ marginRight: '10px' }}>
        Sing up
      </Button>
      <Button variant="contained" component={NavLink} to="/login">
        Sing in
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;
