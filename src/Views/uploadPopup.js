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
import fs from 'fs';




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

  

  const onSelectFile = (event) => {
    const selectedFile = event.target.files;
    const selectedFilesArray = Array.from(selectedFile);

    if (selectedFilesArray.length < 6) {
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      //console.log(imagesArray);
      setSelectedImages(imagesArray);
      setImageFiles(imagesArray);

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
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(imageFiles);
    // const formData = new FormData();
    // formData.append('files[]', imageFiles);
    // formData.append('name', 'Test App 23');
    // formData.append('description', 'About test app 23');
    // try {
    //   const response = await axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/api/posts',
    //     data: formData,
    //     headers: {
    //       Authorization:
    //         'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjUzNTlhYTQ0YmY5MGQyYWViZTcxNTlhNTJiOTA0ZDk5MTcyYjcwYmJmNzY2N2JmMmVhOTVjYjdmYjg0ZjlmZWYwNjg3M2JhMmUxNzUzY2QiLCJpYXQiOjE2NjU2Mzg1NjAuOTU2NDE0LCJuYmYiOjE2NjU2Mzg1NjAuOTU2NDE5LCJleHAiOjE2OTcxNzQ1NjAuODUyNTIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ff8Ck7MJNCOmiaq8-n8Ui9pzEubemKFIs-NElp3pTuaYziYEQTYkC0L-4u6rq7IqJiPhPiLFEe-U6Iwyc93CzUfbVX1yfPZeNSLvlG5GpXvHuEW_j-ofel2LsXgO3L9npfoj351hqWHxDXbPDTQcM4BQ2hSbmdsY6on86wqSCMleMDWmoYR8k5A4WMZeO4C8K2RZBdzrC5Cyr4JGf7GmCjC8iEnuiCt1LXeAeIgOj_uVuZyjHy_UH18WIUPqxpWNoM-AOU_4DPqdW5sUve9ItUDXXgc5MCbkhK-9Cyg3vstjDAQfkXgAjifL1iTUsjJAg1pw3E0NvHYa4SrnEK9ktctF1_vnR5-REolzsuMldUR34I0g7aJnZ2RSWWX4i5T1DbFN4jnG4DoR2NeXGx56n7hr1RD-HLfE6jEh_xLs4hFq9Jctm1jqgU4HqFgJ5XDJ-4SYp13lHtdwXFD6Xpsxz-v6ZBJKJALFo5jvJBykGBkOgFgvKs_32cBNmc5NqOOZywwc7eI2zF6mycV-YJuWopj_El0K89HyKMLJ0jTy-_d_HagNfMTFnNkyPrTzyhjO882vmoZ-gIYWrdmzsd_XOJ9mnuRUMoGiQlvaUJbCjM7NPfPPzFHdMFoJQswexXjV-ZteV_QnsJN8zzswSKfrdtlWWj1C96A0X6f-u91yHg4',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }



   // var fs = require('fs');
    //var axios = require('axios');
var FormData = require('form-data');

var data = new FormData();
    // data.append(
    //   'files[]', imageFiles
    // );
    data.append(
      'files[]', fs.createReadStream('/C:/Users/UABEYPI/Downloads/leaves-eye-peeking-2-640-300x300.jpg')
    );
    data.append('name', 'test application new');
    data.append('description', 'test application new description');

    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/posts',
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjUzNTlhYTQ0YmY5MGQyYWViZTcxNTlhNTJiOTA0ZDk5MTcyYjcwYmJmNzY2N2JmMmVhOTVjYjdmYjg0ZjlmZWYwNjg3M2JhMmUxNzUzY2QiLCJpYXQiOjE2NjU2Mzg1NjAuOTU2NDE0LCJuYmYiOjE2NjU2Mzg1NjAuOTU2NDE5LCJleHAiOjE2OTcxNzQ1NjAuODUyNTIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ff8Ck7MJNCOmiaq8-n8Ui9pzEubemKFIs-NElp3pTuaYziYEQTYkC0L-4u6rq7IqJiPhPiLFEe-U6Iwyc93CzUfbVX1yfPZeNSLvlG5GpXvHuEW_j-ofel2LsXgO3L9npfoj351hqWHxDXbPDTQcM4BQ2hSbmdsY6on86wqSCMleMDWmoYR8k5A4WMZeO4C8K2RZBdzrC5Cyr4JGf7GmCjC8iEnuiCt1LXeAeIgOj_uVuZyjHy_UH18WIUPqxpWNoM-AOU_4DPqdW5sUve9ItUDXXgc5MCbkhK-9Cyg3vstjDAQfkXgAjifL1iTUsjJAg1pw3E0NvHYa4SrnEK9ktctF1_vnR5-REolzsuMldUR34I0g7aJnZ2RSWWX4i5T1DbFN4jnG4DoR2NeXGx56n7hr1RD-HLfE6jEh_xLs4hFq9Jctm1jqgU4HqFgJ5XDJ-4SYp13lHtdwXFD6Xpsxz-v6ZBJKJALFo5jvJBykGBkOgFgvKs_32cBNmc5NqOOZywwc7eI2zF6mycV-YJuWopj_El0K89HyKMLJ0jTy-_d_HagNfMTFnNkyPrTzyhjO882vmoZ-gIYWrdmzsd_XOJ9mnuRUMoGiQlvaUJbCjM7NPfPPzFHdMFoJQswexXjV-ZteV_QnsJN8zzswSKfrdtlWWj1C96A0X6f-u91yHg4',
          'Content-Type': 'multipart/form-data'
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
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
