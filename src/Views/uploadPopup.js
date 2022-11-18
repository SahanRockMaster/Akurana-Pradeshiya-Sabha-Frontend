import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  Box,
  Stack,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
} from '@mui/material';
import ActionButton from '../Controls/ActionButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteButton from '@material-ui/icons/Delete';
import ImageUpload from '@mui/icons-material/AddToPhotos';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import axios from 'axios';

const style = makeStyles({
  titleItemRight: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '50%',
    right: '0.5%',
    height: 40,
    float: 'right',
    position: 'relative',
    //transform: 'translateY(10%)',
  },
  uploadBtn: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '10%',
    left: '30%',
    width: 300,
    height: 40,
    float: 'left',
    position: 'relative',
  },
});

export default function Popup(props) {
  const [selectedImages, setSelectedImages] = useState([]);
  //const [imageFiles, setImageFiles] = useState([]);
  const { openPopup, setOpenPopup } = props;
  const [selectWidth, setSelectWidth] = useState(10);
  const [selectHeight, setSelectHeight] = useState(10);

  const [ximages, setXimages] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const onSelectFile = (event) => {
    const selectedFile = event.target.files;
    const selectedFilesArray = Array.from(selectedFile);
    setXimages(event.target.files);

    if (selectedFilesArray.length <= 6) {
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setSelectedImages(imagesArray);
      //setImageFiles(imagesArray);

      if (imagesArray.length === 3 || imagesArray.length < 3) {
        setSelectWidth(310);
        setSelectHeight(310);
      } else if (imagesArray.length > 3) {
        setSelectWidth(610);
        setSelectHeight(610);
      }
    } else {
      const images = selectedFilesArray.slice(0, 6);
      const imagesArray = images.map((file) => {
        return URL.createObjectURL(file);
      });
      //setImageFiles(imagesArray);
      setSelectedImages(imagesArray);

      if (imagesArray.length === 3 || imagesArray.length < 3) {
        setSelectWidth(610);
        setSelectHeight(310);
      } else if (imagesArray.length > 3) {
        setSelectWidth(610);
        setSelectHeight(610);
      }
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
    clearFields();
  };

  const remove = (value) => {
    // "current" contains the latest state array
    const imageArray = Object.values(ximages);
    if (ximages.length > 6) {
      const sixElements = imageArray.filter((l) => imageArray.indexOf(l) <= 5);
      console.log(sixElements);
      setXimages(sixElements.filter((e) => e.name !== value));
    } else {
      const values = Object.values(ximages);
      setXimages(values.filter((e) => e.name !== value));
    }
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));

    const index = selectedImages.indexOf(image);
    const value = ximages[index].name;
    remove(value);
    //console.log();
    URL.revokeObjectURL(image);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(ximages.length);

    let token = localStorage.getItem('token');

    let data = new FormData();
    if (ximages.length <= 6) {
      for (var i = 0; i < ximages.length; i++) {
        data.append('files[]', ximages[i]);
      }
    } else {
      for (var j = 0; j < 6; j++) data.append('files[]', ximages[j]);
    }
    data.append('name', title);
    data.append('description', description);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(`http://localhost:8000/api/posts`, data, config)
      .then((response) => {
        
        if (response.status === 200) {
          clearFields();
          setOpenPopup(false);
          props.fetchData(localStorage.getItem('token'));
          props.toastPOP(1, 'Blog Post successfully Added!');
        }
      })
      .catch((error) => {
        console.log(error);
        props.toastPOP(2, error.message);
      });
  };

  const clearFields = () => {
    setXimages(null);
    setSelectedImages([]);
    // setImageFiles([]);
    setTitle(null);
    setDescription(null);
  };

  const classes = style();

  return (
    <Dialog open={openPopup} maxWidth="md">
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ p: 1, height: 40, width: 860 }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{ p: 0, height: 40, width: 830 }}
        >
          <DialogTitle>Blog Post Upload</DialogTitle>
        </Box>
        <ActionButton color="secondary" onClick={handleClose}>
          <CloseIcon />
        </ActionButton>
      </Box>

      <DialogContent dividers>
        <Stack direction="row" alignItems="center" spacing={0}>
          <Button
            variant="contained"
            component="label"
            className={classes.uploadBtn}
            startIcon={<ImageUpload />}
            onChange={onSelectFile}
          >
            Upload Images
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Stack>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title of the blog post"
          fullWidth
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <ImageList sx={{ width: { selectWidth }, height: { selectHeight } }}>
          <ImageListItem key="Subheader" cols={2} rows={3}>
            <ListSubheader component="div" spacing={0}>
              Image Preview
            </ListSubheader>
          </ImageListItem>
          {selectedImages.map((item, index) => (
            <ImageListItem key={item}>
              <img
                src={item}
                srcSet={item}
                alt={item}
                loading="lazy"
                height="300"
                width="300"
              />
              <ImageListItemBar
                title={`Image: ${index + 1}`}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`Delete image ${item}`}
                    onClick={() => deleteHandler(item)}
                  >
                    <DeleteButton />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <DialogContentText>
          <br></br>To upload the blog post information to this website, please
          enter the description and photos here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description of the blog post"
          fullWidth
          variant="outlined"
          color="warning"
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.titleItemRight}
          onClick={handleClose}
          variant="contained"
        >
          <b>Cancel</b>
        </Button>
        <Button
          className={classes.titleItemRight}
          //onClick={openPopup}
          onClick={handleSubmit}
          variant="contained"
        >
          <b>Upload</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
