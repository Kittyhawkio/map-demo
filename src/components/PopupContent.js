import PropTypes from 'prop-types';
import {Table, TableCell, TableContainer, TableRow, Box, Typography} from '@mui/material'

const PopupContent = ({feature}) => {

    const styles = {
        main: {
            maxHeight: '500px',
            overflow: 'auto'
        },
        title: {
          padding: '15px'
        },
        row: {'&:last-child td, &:last-child th': {border: 0}}
    };

    const layerName = feature.layer['source-layer'].split('.')[1]

    return <Box sx={styles.main}>
        <Box sx={styles.title}>
            <Typography variant="h6" component="div">Feature Properties</Typography>
        </Box>
        <TableContainer >
            <Table>
                <TableRow>
                    <TableCell>layer</TableCell>
                    <TableCell>{layerName}</TableCell>
                </TableRow>
                {Object.entries(feature.properties).map(([key, val]) => {
                    return <TableRow sx={styles.row}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{val}</TableCell>
                    </TableRow>
                })}
            </Table>
        </TableContainer>
    </Box>


};

PopupContent.propTypes = {
    feature: PropTypes.object.isRequired
};

export default PopupContent;