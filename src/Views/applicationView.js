import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DownloadIcon from '@mui/icons-material/Download';

const style = makeStyles({
  titleItemCenter: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '30%',
    left: '28%',
    height: 30,
    float: 'center',
    position: 'relative',
    transform: 'translateY(5%)',
  },
});

export default function RecipeReviewCard() {
  const classes = style();

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Card
          sx={{ maxWidth: 345, marginBottom: 8, marginLeft: 5, marginTop: 5 }}
          boxShadow={10}
        >
          <CardHeader
            title="Application Form 1"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              className={classes.titleItemCenter}
              onClick={() => {
                //setOpenUpdPopup(true);
              }}
            >
              <b>Download</b>
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </div>
  );
}
