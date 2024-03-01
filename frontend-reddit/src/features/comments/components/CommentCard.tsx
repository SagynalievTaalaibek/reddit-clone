import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

interface Props {
  author: string;
  text: string;
}
const CommentCard: React.FC<Props> = ({ author, text }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            {author}
          </Typography>
          <Typography component={'p'} color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommentCard;
