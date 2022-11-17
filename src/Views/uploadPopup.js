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
import axios from "axios";


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
  const [imageFiles, setImageFiles] = useState([]);
  const { openPopup, setOpenPopup } = props;
  const [selectWidth, setSelectWidth] = useState(10);
  const [selectHeight, setSelectHeight] = useState(10);

  const [selectImage1, setselectImage1] = useState(null);
  const [selectImage2, setselectImage2] = useState(null);
  const [selectImage3, setselectImage3] = useState(null);
  const [selectImage4, setselectImage4] = useState(null);
  const [selectImage5, setselectImage5] = useState(null);
  const [selectImage6, setselectImage6] = useState(null);


  const [ximages, setImages] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();


  const onSelectFile = (event) => {
    const selectedFile = event.target.files;
    const selectedFilesArray = Array.from(selectedFile);
    setImages(event.target.files[0]);

    if (selectedFilesArray.length <= 6) {
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      if (imagesArray.length === 1) {
        setselectImage1(imagesArray[0]);
      } else if (imagesArray.length === 2) {
        setselectImage1(imagesArray[0]);
        setselectImage2(imagesArray[1]);
      } else if (imagesArray.length === 3) {
        setselectImage1(imagesArray[0]);
        setselectImage2(imagesArray[1]);
        setselectImage3(imagesArray[2]);
      } else if (imagesArray.length === 4) {
        setselectImage1(imagesArray[0]);
        setselectImage2(imagesArray[1]);
        setselectImage3(imagesArray[2]);
        setselectImage4(imagesArray[3]);
      } else if (imagesArray.length === 5) {
        setselectImage1(imagesArray[0]);
        setselectImage2(imagesArray[1]);
        setselectImage3(imagesArray[2]);
        setselectImage4(imagesArray[3]);
        setselectImage5(imagesArray[4]);
      } else {
        setselectImage1(imagesArray[0]);
        setselectImage2(imagesArray[1]);
        setselectImage3(imagesArray[2]);
        setselectImage4(imagesArray[3]);
        setselectImage5(imagesArray[4]);
        setselectImage6(imagesArray[5]);
      }

      setSelectedImages(imagesArray);
      setImageFiles(imagesArray);

      if (imagesArray.length === 3 || imagesArray.length < 3) {
        setSelectWidth(310);
        setSelectHeight(310);
      } else if (imagesArray.length > 3) {
        setSelectWidth(610);
        setSelectHeight(610);
        console.log(imagesArray);
      }
    } else {
      const images = selectedFilesArray.slice(0, 6);
      const imagesArray = images.map((file) => {
        return URL.createObjectURL(file);
      });

      setselectImage1(imagesArray[0]);
      setselectImage2(imagesArray[1]);
      setselectImage3(imagesArray[2]);
      setselectImage4(imagesArray[3]);
      setselectImage5(imagesArray[4]);
      setselectImage6(imagesArray[5]);

      setSelectedImages(imagesArray);
      setImageFiles(imagesArray);

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

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
    if (selectedImages.length === 1) {
      setselectImage1(selectedImages[0]);
    } else if (selectedImages.length === 2) {
      setselectImage1(selectedImages[0]);
      setselectImage2(selectedImages[1]);
    } else if (selectedImages.length === 3) {
      setselectImage1(selectedImages[0]);
      setselectImage2(selectedImages[1]);
      setselectImage3(selectedImages[2]);
    } else if (selectedImages.length === 4) {
      setselectImage1(selectedImages[0]);
      setselectImage2(selectedImages[1]);
      setselectImage3(selectedImages[2]);
      setselectImage4(selectedImages[3]);
    } else if (selectedImages.length === 5) {
      setselectImage1(selectedImages[0]);
      setselectImage2(selectedImages[1]);
      setselectImage3(selectedImages[2]);
      setselectImage4(selectedImages[3]);
      setselectImage5(selectedImages[4]);
    } else {
      setselectImage1(selectedImages[0]);
      setselectImage2(selectedImages[1]);
      setselectImage3(selectedImages[2]);
      setselectImage4(selectedImages[3]);
      setselectImage5(selectedImages[4]);
      setselectImage6(selectedImages[5]);
    }
  }

  const handleSubmit = async (event) => {
    

    event.preventDefault();

    let token = localStorage.getItem('token');

    let data = new FormData();
    data.append('files[]', ximages);
    data.append('name', title);
    data.append('description', description);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(`http://127.0.0.1:8000/api/posts`, data, config)
      .then((response) => {
        if (response.status === 200) {
          clearFields();
          setOpenPopup(false);
          props.fetchData(localStorage.getItem('token'));
          props.toastPOP(1,'Blog Post successfully Added!');
        }
      })
      .catch((error) => {
        props.toastPOP(2,error.message);
      });
  };

  const clearFields = () => {
    setImages(null);
    setSelectedImages([]);
    setImageFiles([]);
    setTitle(null);
    setDescription(null);
  }

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
          onChange={(e) => { setTitle(e.target.value) }}
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
          onChange={(e) => (setDescription(e.target.value))}
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
