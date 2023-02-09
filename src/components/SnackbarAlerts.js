import {Snackbar, Alert, Box} from "@mui/material";
import PropTypes from 'prop-types';
import {$danger, $success, $warning, $primary} from "styles/colors";

const styles = {
    snackBar: {
        '& .MuiAlert-filledSuccess': {
            backgroundColor: `${$success} !important`
        },
        '& .MuiAlert-filledError': {
            backgroundColor: `${$danger} !important`
        },
        '& .MuiAlert-filledInfo': {
            backgroundColor: `${$primary} !important`
        },
        '& .MuiAlert-filledWarning': {
            backgroundColor: `${$warning} !important`
        }
    },
    alert: {
        display: 'flex',
        alignItems: 'center'
    }
};

const SnackbarAlerts = ({errors, setErrors}) => {

    const handleClose = (e, idx, reason) => {
        e?.stopPropagation();
        if (reason === 'clickaway') {
            return; //Ignore when handleClose is triggered again by clicking away from the alert component
        }
        const updatedErrors = [...errors];
        updatedErrors.splice(idx, 1);
        setErrors(updatedErrors)
    };

    return errors.map((error, idx) => {
        return <Snackbar
            key={idx}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            style={{ top: `${idx !== 0 ? idx * 70 + 20 : 20}px` }}
            open
            sx={styles.snackBar}
        >
            <Alert
                elevation={6}
                variant='filled'
                icon={false}
                severity={error.type}
                onClose={e => handleClose(e, idx, 'fromAlert')}
            >
                <Box sx={styles.alert}>
                    {error.message}
                </Box>
            </Alert>
        </Snackbar>
    })
};

SnackbarAlerts.propTypes = {
    errors: PropTypes.array.isRequired,
    setErrors: PropTypes.func.isRequired
}

export default SnackbarAlerts;