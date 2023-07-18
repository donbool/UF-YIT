import React, { Component } from 'react';
import {
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
  Select,
  MenuItem,
  Paper,
  Typography,
  IconButton,
  Grid,
  Card,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import axios from 'axios';
import logo from './logo2.png';
import { withRouter } from './utils';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  logo: {
    maxHeight: '100px',
    marginRight: '20px',
    marginTop: '20px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    background: '-webkit-linear-gradient(45deg, #00E1FF 30%, #00FF9F 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  container: {
    padding: '20px',
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
  }
  // Remainder of your style definitions go here.
});

// Class and other components below go here.

// Header component
const Header = ({ logo, title, navigate, classes, logOut }) => {
  return (
    <div className={classes.header}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate('/payroll')}
        >
          Dashboard
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size="small"
          onClick={logOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openSessionEditModal: false,
      id: '',
      username: '',
      students: [],
      password: '',
      file: '',
      page: 1,
      search: '',
      users: [],
      pages: 0,
      loading: false,
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.navigate('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getSession();
      });
    }
  };

  getSession = () => {
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios
      .get(`http://localhost:2000/get-users${data}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        this.setState({ loading: false, users: res.data.users, pages: res.data.pages });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: 'error',
          type: 'error',
        });
        this.setState({ loading: false, users: [], pages: 0 });
      });
  };

  deleteSession = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this session!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirmDelete) => {
      if (confirmDelete) {
    axios.post('http://localhost:2000/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }
});
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getSession();
    });
  };

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.navigate('/');
  };

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name });
    }
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'search') {
      this.setState({ page: 1 }, () => {
        this.getSession();
      });
      
    }
  };

  updateSession = () => {
    const userData = {
      id: this.state.id,
      username: this.state.username,
      project: this.state.project,
      password: this.state.password,
      fullName: this.state.fullName,
      role: this.state.role,
    };

    axios
      .post('http://localhost:2000/update-users', userData, {
        headers: {
          'Content-Type': 'application/json',
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: 'success',
          type: 'success',
        });

        this.handleSessionEditClose();
        this.setState(
          {
            username: '',
            project: '',
            password: '',
            role: '',
            fullName: '',
            file: null,
          },
          () => {
            this.getSession();
          }
        );
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: 'error',
          type: 'error',
        });
        this.handleSessionEditClose();
      });
  };

  handleSessionEditOpen = (data) => {
    this.setState({
      openSessionEditModal: true,
      id: data._id,
      username: data.username,
      project: data.project,
      fullName: data.fullName,
      password: data.password,
      role: data.role,
    });
  };

  handleSessionEditClose = () => {
    this.setState({ openSessionEditModal: false });
  };
    render() {
  const { classes } = this.props;

  return (
    <div className={classes.container}>
      {this.state.loading && <LinearProgress size={40} />}
      <div className={classes.header}>
        <Typography variant="h5" align="center" style={{ flex: 1 }}>
          Account Management
        </Typography>

        <div className={classes.header} style={{ justifyContent: 'center' }}>
</div>

        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.props.navigate('/register')}
          >
            REGISTER
          </Button>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.props.navigate('/WelcomePage')}
          >
            HOME
          </Button>

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.logOut}
          >
            LOG OUT
          </Button>
        </div>
      </div>

      {/* Edit Session */}
      <Dialog
        open={this.state.openSessionEditModal}
        onClose={this.handleSessionClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          Edit Session
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="Username"
            required
          />

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="fullName"
            value={this.state.fullName}
            onChange={this.onChange}
            placeholder="Full Name"
            required
          />

          <Select
            id="standard-basic"
            name="role"
            value={this.state.role}
            onChange={this.onChange}
            required
            placeholder="Role"
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Tutor">Tutor</MenuItem>
          </Select>

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />

          <Select
            id="standard-basic"
            name="project"
            value={this.state.project}
            onChange={this.onChange}
            required
            placeholder="Project"
          >
            <MenuItem value="Steam+">Steam+</MenuItem>
            <MenuItem value="Butterfly">Butterfly</MenuItem>
            <MenuItem value="Total_Acess">Total Access</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleSessionEditClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={
              this.state.username === '' ||
              this.state.project === '' ||
              this.state.password === '' ||
              this.state.fullName === ''
            }
            onClick={(e) => this.updateSession()}
            color="primary"
            autoFocus
          >
            Edit Session
          </Button>
        </DialogActions>
      </Dialog>

      <br />

      <Paper className={classes.tableContainer}>
        <TextField
          id="standard-basic"
          type="search"
          autoComplete="off"
          name="search"
          value={this.state.search}
          onChange={this.onChange}
          placeholder="Search by Name"
          required
          className={classes.searchField}
        />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Password</TableCell>
              <TableCell align="center">Project</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map((row) => (
              <TableRow key={row.username}>
                <TableCell align="center" component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">{row.password}</TableCell>
                <TableCell align="center">{row.project}</TableCell>
                <TableCell align="center">
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ marginRight: '10px' }}
                  onClick={(e) => this.handleSessionEditOpen(row)}
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={(e) => this.deleteSession(row._id)}
                >
                  Delete
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <Pagination
          className={classes.pagination}
          count={this.state.pages}
          page={this.state.page}
          onChange={this.pageChange}
          color="primary"
        />
      </Paper>
    </div>
  );
}

  
}

export default withStyles(styles)(withRouter(Dashboard));
