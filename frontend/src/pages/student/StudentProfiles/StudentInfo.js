import React, { Component } from 'react';
import {
    createStyles,
    withStyles,

} from '@material-ui/core';
import Navbar from '../../../components/shared/nodropdownNavbar';
import swal from 'sweetalert';
import { withRouter } from '../../../utils';
import axios from 'axios';

//non-navbar imports
import { CheckBox, CheckBoxOutlineBlank, CheckBoxOutlineBlankOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import {
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  InputLabel,
  makeStyles,
  Select,
  MenuItem,
  Paper,
  Typography,
  Card,
} from '@material-ui/core';
import { Grid, IconButton, CardHeader, CardContent, CardActions } from '@material-ui/core';

import logo from '../../../images/userProfile.png';


const styles = createStyles({
    container: {
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    logo: {
        height: '80px',
    },
    title: {
        color: '#07EBB8',
        margin: '0',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        textTransform: 'none',
    },
    tableContainer: {
        marginTop: '5px',
    },
    searchField: {
        marginBottom: '20px',
    },
    pagination: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    dialogTitle: {
        background: '#07EBB8',
        color: '#fff',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    avatarTheme: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
        height: '400px',
    },
});




class StudentInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          benchmark: '',
          marks: '',
          comments: '',
          showElements: true,
          checked: true,
        };
      }

      toggleChecked = () => {
        this.setState((prevState) => ({
          checked: !prevState.checked,
        }));
      };
    
      toggleVisibility = () => {
        this.setState((prevState) => ({
          showElements: !prevState.showElements,
        }));
      };

      //update unique student info
    
      handleBenchmarkChange = (event) => {
        this.setState({ benchmark: event.target.value });
      };
    
      handleCommentsChange = (event) => {
        this.setState({ comments: event.target.value });
      };
    
      handleMarksChange = (event) => {
        this.setState({ marks: event.target.value });
      };

      handleSave = () => {
        // Handle saving the values
        console.log('Benchmarks:', this.state.benchmark);
        console.log('Marks:', this.state.marks);
        console.log('Comments:', this.state.comments);
      };
    
    render() {
        const { benchmark, marks, comments, showElements, checked } = this.state;

        return (
            <div>
                
                <Navbar></Navbar>
                    <div>
                        <h1 style={{ color: '#07EBB8' }}>This is a Student</h1>
                    </div>
                    <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar alt="student photo" src={logo} style={{ height: 'auto', width: '20%' }} />
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                Grade:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Project:  
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-multiline-static"
                multiline
                rows={4}
                placeholder="Gray Box"
                defaultValue="Add statistic details here"
                variant="filled"
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={this.toggleVisibility}>
                {showElements ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {showElements && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="filled-multiline-static"
                  label="Benchmarks"
                  multiline
                  rows={5}
                  variant="filled"
                  value={benchmark}
                  onChange={this.handleBenchmarkChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="filled-multiline-static"
                  label="Marks"
                  multiline
                  rows={5}
                  variant="filled"
                  value={marks}
                  onChange={this.handleMarksChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="filled-multiline-static"
                  label="Comments"
                  multiline
                  rows={5}
                  variant="filled"
                  value={comments}
                  onChange={this.handleCommentsChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={this.handleSave}
                  style={{
                    color: '#FFFFFF',
                    background: 'linear-gradient(45deg, #00E1FF 30%, #00FF9F 90%)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  }}
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>               
                </div>

        );
    }


}

export default withStyles(styles)(withRouter(StudentInfo));
