import React, { Component } from 'react';
import {
    Button,
    TextField,
    Card, CardHeader, CardContent, CardActions,
    Dialog,
    DialogActions,
    Grid,
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
    createStyles,
    Select,
    MenuItem,
    withStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
import { withRouter } from './utils';
import axios from 'axios';

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
});

class StudentProfiles extends Component {
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
            .get(`http://localhost:2000/get-students${data}`, {
                headers: {
                    token: this.state.token,
                },
            })
            .then((res) => {
                this.setState({ loading: false, students: res.data.students, pages: res.data.pages });
            })
            .catch((err) => {
                swal({
                    text: err.response.data.errorMessage,
                    icon: 'error',
                    type: 'error',
                });
                this.setState({ loading: false, students: [], pages: 0 });
            });
    };


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


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                {this.state.loading && <LinearProgress size={40} />}

                <div>
                    <h1 style={{ color: '#07EBB8' }}>Student Profiles</h1>

                </div>

                <div>
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
                        className="button_style"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => this.props.navigate("/WelcomePage")}
                    >
                        Home
                    </Button>

                    <Button
                        className="button_style"
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={this.logOut}
                    >
                        Log Out
                    </Button></div>


                <br />

                <Paper className={classes.tableContainer}>
                    <TextField
                        id="standard-basic"
                        type="search"
                        autoComplete="off"
                        name="search"
                        value={this.state.search}
                        onChange={this.onChange}
                        placeholder="Search by Student Name"
                        required
                        className={classes.searchField}
                    />
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Grade</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.students.map((row) => (
                                <TableRow key={row.username}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.grade}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => this.props.navigate('/StudentProfiles/' + row.fullName)}
                                        >
                                            View
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

export default withStyles(styles)(withRouter(StudentProfiles));
