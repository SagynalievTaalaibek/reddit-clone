import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { apiURL } from '../../../constants';
import imageMessage from '../../../assets/images/message.png';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

dayjs.extend(LocalizedFormat);

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '48%', // 16:9 56.25%
});

interface Props {
  id: string;
  title: string;
  author: string;
  datetime: string;
  image: string | null;
}

const PostItem: React.FC<Props> = ({ id, title, image, datetime, author }) => {
  let cardImage = imageMessage;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <>
      <Grid
        item
        xs
        sx={{
          mb: 2,
          padding: '10px',
          border: '1px solid black',
          borderRadius: '10px',
        }}
      >
        <Card sx={{ height: '100%' }}>
          <Grid container>
            <Grid item xs={4}>
              <ImageCardMedia
                image={cardImage}
                title={title}
                sx={{ maxWidth: '330px', height: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" component={'p'}>
                    {dayjs(datetime).format('lll')}
                  </Typography>
                  <Typography
                    variant="h5"
                    component={'p'}
                    sx={{ marginLeft: '10px' }}
                  >
                    by: {author}
                  </Typography>
                </Box>
                <Typography variant="h5" component={NavLink} to={`/post/${id}`}>
                  {title}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default PostItem;
