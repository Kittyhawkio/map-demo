import PropTypes from 'prop-types';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button} from '@mui/material';
import {ALOFT_API_URL, ALOFT_TOKEN, defaultAloftApiUrl, MAPBOX_TOKEN} from "constants/appConstants";
import {useState} from 'react';
import SnackbarAlerts from "components/SnackbarAlerts";
import {$danger} from "styles/colors";

const styles = {
    dialog: {
      padding: '20px'
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gridGap: '20px'
    },
    error: {
        color: $danger
    }
}


const SetupDialog = ({open, onClose, errors, setErrors}) => {

    const [aloftApiUrl, setAloftApiUrl] = useState( localStorage.getItem(ALOFT_API_URL) || defaultAloftApiUrl)
    const [aloftToken, setAloftToken] = useState(localStorage.getItem(ALOFT_TOKEN))
    const [mapboxToken, setMapboxToken] = useState(localStorage.getItem(MAPBOX_TOKEN))


    const handleSetAloftApiUrl = (e) => {
        setAloftApiUrl(e.target.value)

    };

    const handleSetAloftToken = (e) => {
        setAloftToken(e.target.value)

    }

    const handleSetMapboxToken = (e) => {
        setMapboxToken(e.target.value)

    }

    const handleSetValues = () => {
        localStorage.setItem(ALOFT_API_URL, aloftApiUrl)
        localStorage.setItem(ALOFT_TOKEN, aloftToken);
        localStorage.setItem(MAPBOX_TOKEN, mapboxToken);
        setErrors([])
        onClose();
    }

    const handleReset = () => {
      setAloftApiUrl(defaultAloftApiUrl);
      setAloftToken('');
      setMapboxToken('')
    };


    return <Dialog open={open} maxWidth={'md'} fullWidth sx={styles.dialog}>
        <DialogTitle sx={errors.length === 0 ? null : styles.error}>{errors.length === 0 ? 'Enter Credentials': 'Please Check Your Credentials'}</DialogTitle>
        <DialogContent>
            <SnackbarAlerts errors={errors} setErrors={setErrors}/>
        </DialogContent>
        <DialogContent sx={styles.dialogContent}>
            <TextField error={!aloftApiUrl} label="Aloft API URL" variant="standard" value={aloftApiUrl} onChange={handleSetAloftApiUrl}/>
            <TextField error={!aloftToken} label="Aloft API Token" variant="standard" value={aloftToken} onChange={handleSetAloftToken}/>
            <TextField error={!mapboxToken} label="Mapbox API Token" variant="standard" value={mapboxToken} onChange={handleSetMapboxToken}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleReset}>Reset</Button>
            <Button disabled={!aloftApiUrl || !aloftToken || !mapboxToken} onClick={handleSetValues}>Continue</Button>
        </DialogActions>
    </Dialog>
};

SetupDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    setErrors: PropTypes.func.isRequired
};

export default SetupDialog;

