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
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RecipeReviewCard() {
  const classes = style();
  const token = localStorage.getItem('token');
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await axios
      .get('http://localhost:8000/api/getAllApplications')
      .then((response) => {
        if (response?.status === 200) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <ToastContainer />
      {/* <Stack
        direction="row"
        sx={{
          marginBottom: 8,
          marginLeft: 5,
          marginTop: 5,
        }}
      > */}
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {/* <Grid item xs={6}>
          <Item> */}
          {data.map((app) => {
          return (
            <Grid item xs={2} sm={4} md={4} >
          <Item>
            <Card
              sx={{
                maxWidth: 345,
                maxHeight: 440,
                marginBottom: 5,
                marginLeft: 5,
                marginTop: 5,
              }}
              boxShadow={10}
            >
              <CardHeader title={app.name} subheader="September 14, 2016" />
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:8000/${app.application_attachments[0].attachment}`}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {app.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {app.application_attachments.length !== 0 && (
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
                )}
              </CardActions>
            </Card>
            </Item>
        </Grid>
          );
        })}
          {/* </Item>
        </Grid> */}
      </Grid>
      </Box>
        {/* {data.map((app) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                maxHeight: 460,
                marginBottom: 8,
                marginLeft: 5,
                marginTop: 5,
              }}
              boxShadow={10}
            >
              <CardHeader title={app.name} subheader="September 14, 2016" />
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:8000/${app.application_attachments[0].attachment}`}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {app.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {app.application_attachments.length !== 0 && (
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
                )}
              </CardActions>
            </Card>
          );
        })} */}
      {/* </Stack> */}
    </div>
  );
}
