import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Logo from '../assets/logofooter.png';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="info">
          <table className="table2">
            <tr>
              <td calssname="tableheader2">
                <img alt="logo pradeshiya sabha" src={Logo} />
              </td>
            </tr>
            <tr>
              <td calssname="tableheader2">
                <InstagramIcon /> <TwitterIcon /> <FacebookIcon />
                <LinkedInIcon />
              </td>
            </tr>
          </table>
          <table className="table1">
            <tr>
              <td className="tableData3"><b>Useful Links</b></td>
              <td className="tableData3"><b>From the News</b></td>
              <td className="tableData3"><b>Our News</b></td>
              <td className="tableData3"><b>Susbcribe Newsletter</b></td>
            </tr>
            <tr>
              <td className='newtb'>Help</td>
              <td calssname="newtb">forms</td>
              <td calssname="newtb">Events</td>
              <td calssname="newtb">Dwonload</td>
            </tr>
            <tr className='tablerow'>
              <td calssname="tableData3">About Us</td>
              <td calssname="tableData3">Services</td>
              <td calssname="tableData3">Blog</td>
              <td calssname="tableData3">Contact Us</td>
            </tr>
            <tr >
              <td calssname="tableData3">E Services</td>
              <td calssname="tableData3">Parties and candidates</td>
              <td calssname="tableData3">For Voters</td>
              <td calssname="tableData3">Misc. Info</td>
            </tr>
            <tr>
              <td colSpan="4"><center><p> &copy; 2022 Akurana Pradeshiya Sabha</p></center></td>
            </tr>
          </table>
        </div>
        {/* <p> &copy; 2022 Akurana Pradeshiya Sabha</p> */}
      </div>
    </footer>
  );
}

export default Footer;
