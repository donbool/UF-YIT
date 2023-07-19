import React, { Component } from 'react';
import {
    createStyles,
    withStyles,

} from '@material-ui/core';
import Navbar from '../../../components/shared/nodropdownNavbar';
import swal from 'sweetalert';
import { withRouter } from '../../../utils';
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




class StudentInfo extends Component {
    
    render() {
        return (
            <div>
                
                <Navbar></Navbar>

                <div>
                    

                    <div>
                        <h1 style={{ color: '#07EBB8' }}>This is a Student</h1>

                    </div>


                    
                </div>
            </div>
        );
    }


}

export default withStyles(styles)(withRouter(StudentInfo));
