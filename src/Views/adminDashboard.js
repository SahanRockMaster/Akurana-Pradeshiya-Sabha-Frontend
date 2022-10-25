import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import FileUpload from '@mui/icons-material/FileUpload';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EvtIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import UserIcon from '@mui/icons-material/Person3';
import UpdIcon from '@mui/icons-material/Update';
import DelIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/CalendarToday';
import ViewIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Speed';
import MailIcon from '@mui/icons-material/Mail';
import SandwichIcon from '@mui/icons-material/MenuRounded';

import Popup from './uploadPopup';
import { useHistory } from "react-router-dom";

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
    transform: 'translateY(10%)',
  },
  titleItemLeft: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '30%',
    left: '0.5%',
    height: 40,
    float: 'left',
    position: 'relative',
    transform: 'translateY(10%)',
  },
  rowButton: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '0%',
    left: '0%',
    height: 30,
    float: 'left',
    position: 'relative',
    transform: 'translateY(10%)',
  },
});

// const [state, setState] = useState({
//   top: false,
//   left: false,
//   bottom: false,
//   right: false,
// });

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Post Title', width: 260 },
  { field: 'description', headerName: 'Post Description', width: 350 },
  {
    field: 'update action',
    headerName: 'Update Action',
    type: 'number',
    width: 180,
    renderCell: (cellValues) => {
      const classes = style();
      return (
        <Button
          variant="contained"
          startIcon={<UpdIcon />}
          className={classes.rowButton}
          onClick={() => { }}
        >
          <b>Post Update</b>
        </Button>
      );
    },
  },
  {
    field: 'delete action',
    headerName: 'Delete Action',
    type: 'number',
    width: 160,
    renderCell: (cellValues) => {
      const classes = style();
      return (
        <Button
          variant="contained"
          startIcon={<DelIcon />}
          className={classes.rowButton}
          onClick={() => { }}
        >
          <b>Delete</b>
        </Button>
      );
    },
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, description: 'Snow', title: 'Jon', updateAction: 34 },
  { id: 2, description: 'Lannister', title: 'Cersei', updateAction: 34 },
  { id: 3, description: 'Lannister', title: 'Jaime', updateAction: 34 },
  { id: 4, description: 'Stark', title: 'Arya', updateAction: 34 },
  { id: 5, description: 'Targaryen', title: 'Daenerys', updateAction: 34 },
  { id: 6, description: 'Melisandre', title: null, updateAction: 34 },
  { id: 7, description: 'Clifford', title: 'Ferrara', updateAction: 34 },
  { id: 8, description: 'Frances', title: 'Rossini', updateAction: 34 },
  { id: 9, description: 'Roxie', title: 'Harvey', updateAction: 34 },
];

export default function AdminDashboard() {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [state, setState] = React.useState({ left: false });
  const history = useHistory();
  const [username, setUsername] = React.useState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    setUsername(localStorage.getItem('user'));
    if (token == null) {
      history.push('/AdminLogin');
    }
  });

  const signout = () => {
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          `User ${username !== null ? ': ' + username : ''}`,
          'Events Portal',
          'Application Portal',
          'Blog Post View',
          <a href="../AdminFormView">Application Form View</a>
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <UserIcon />
                ) : index === 1 ? (
                  <EvtIcon />
                ) : index === 2 ? (
                  <DashboardIcon />
                ) : index === 3 ? (
                  <EventIcon />
                ) : (
                  <ViewIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Sign Out'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={signout}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <LogoutIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const classes = style();
  return (
    <div>
      <Button
        sx={{ fontWeight: 'bold' }}
        variant="contained"
        endIcon={<FileUpload />}
        className={classes.titleItemRight}
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        Blog Post Upload
      </Button>

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}></Popup>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            startIcon={<SandwichIcon />}
            className={classes.titleItemLeft}
            onClick={toggleDrawer(anchor, true)}
          >
            Menu
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <h1 align="center">Admin Dashboard</h1>
      <div
        style={{
          height: 400,
          width: '90%',
          paddingTop: 90,
          paddingLeft: 70,
          paddingRight: 90,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
