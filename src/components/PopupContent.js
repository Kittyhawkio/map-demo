import PropTypes from 'prop-types';
import {Table, TableBody, TableCell, TableContainer, TableRow, Box, Typography} from '@mui/material'

const PopupContent = ({feature}) => {

    const styles = {
        main: {
            maxHeight: '500px',
            maxWidth: '500px',
            overflow: 'auto'
        },
        title: {
          padding: '15px'
        },
        row: {'&:last-child td, &:last-child th': {border: 0}},
        cell: {
            maxWidth: '250px',
            overflowWrap: 'break-word'
        }
    };

    const layerName = feature.layer['source-layer'].split('.')[1]

    return <Box sx={styles.main}>
        <Box sx={styles.title}>
            <Typography variant="h6" component="div">Feature Properties</Typography>
        </Box>
        <TableContainer >
            <Table>
                <TableBody>
                <TableRow>
                    <TableCell sx={styles.cell}>layer</TableCell>
                    <TableCell sx={styles.cell}>{layerName}</TableCell>
                </TableRow>
                {Object.entries(feature.properties).map(([key, val]) => {
                    return <TableRow sx={styles.row} key={key}>
                        <TableCell sx={styles.cell}>{key}</TableCell>
                        <TableCell sx={styles.cell}>{val}</TableCell>
                    </TableRow>
                })}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>


};

PopupContent.propTypes = {
    feature: PropTypes.object.isRequired
};

export default PopupContent;