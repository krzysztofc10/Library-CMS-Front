import React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const BookGrids = ({ data: { title, id, issueDate, type, pages } }: any) => {
  const newPhoto = String(id).length === 1 ? `0${id}` : String(id);
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`https://raw.githubusercontent.com/anqxyr/racovimge/master/examples/ex${newPhoto}.png`}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary" component="div">
              Kelsey Miller
            </Typography> */}
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Rok wydania: {issueDate.split('-')[0]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Typ: {type}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            L.Stron: {pages}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
          <Button variant="contained" size="small" style={{ marginRight: 3, marginLeft: 5 }}>
            Wypożycz
          </Button>
          <Button variant="contained" size="small" color="secondary">
            Podgląd
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
