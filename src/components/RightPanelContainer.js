import { Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { $primary, $white } from 'styles/colors';
import { aboutLink, termsLink } from 'constants/appConstants';

const styles = {
    detailPanelContainer: {
        width: '100%',
        height: '100%'
    },
    footer: {
        height: 50,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: $white,
        zIndex: 100
    },
    divider: {
        width: '100%'
    },
    footerLinks: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
    },
    link: {
        cursor: 'pointer',
        color: $primary,
        fontSize: 16
    }
};

const RightPanelContainer = () => {

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const handleClickAboutAloft = () => {
        window.open(aboutLink);
    };

    const handleClickTerms = () => {
        window.open(termsLink);
    };

    return <div className={classes.detailPanelContainer}>

        Right panel

        <div className={classes.footer}>
            <Divider className={classes.divider} />
            <div className={classes.footerLinks}>
                <div className={classes.link} onClick={handleClickAboutAloft}>
                    About Aloft
                </div>
                <div className={classes.link} onClick={handleClickTerms}>
                    Terms of Use
                </div>
            </div>
        </div>
    </div>
};

export default RightPanelContainer;