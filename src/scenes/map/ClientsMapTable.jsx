import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const regionNames = {
    1: "Laayoune-Saguia Hamra",
    2: "Oriental",
    3: "Tanger-Tetouan-Hoceima",
    4: "Fes-Meknes",
    5: "Rabat-Sale-Kenitra",
    6: "Casablanca-Settat",
    7: "Beni Mellal-Khenifra",
    8: "Daraa-Tafilelt",
    9: "Souss Massa",
    10: "Guelmim-Oued Noun",
    11: "Dakhla-Oued Eddahab",
    12: "Marrakech-Safi"
};

const useStyles = makeStyles(() => ({
    tableRow: {
        "&:hover": {
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
        },
        transition: "background-color 0.3s ease",
    },
    tableCell: {
        position: "relative",
    },
    underline: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        backgroundColor: "transparent",
        transition: "width 0.3s ease",
    },
    underlineHovered: {
        width: "100%",
        backgroundColor: '#0D47A1', 
    },
}));

const RegionTable = ({ data, theme, setRegionId }) => {
    const classes = useStyles();

    const handleMouseEnter = (event) => {
        event.currentTarget.querySelector(`.${classes.underline}`).classList.add(classes.underlineHovered);
    };

    const handleMouseLeave = (event) => {
        event.currentTarget.querySelector(`.${classes.underline}`).classList.remove(classes.underlineHovered);
    };

    const handleRowClick = (id) => {
        setRegionId(id);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="region table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Région</TableCell>
                        <TableCell align="right" style={{ color: theme.palette.secondary.light, fontSize: 16, fontWeight: "bold" }}>Nb de clients</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row) => (
                            <TableRow
                                key={row.id}
                                className={classes.tableRow}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {regionNames[row.id]}
                                    <div className={classes.underline} />
                                </TableCell>
                                <TableCell align="right" style={{ color: theme.palette.secondary.light, fontWeight: "bold" }}>{row.value}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RegionTable;
