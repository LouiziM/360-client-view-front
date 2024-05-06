import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box, Typography, Button, IconButton } from '@mui/material';
import TransgenderIcon from '@mui/icons-material/Transgender';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DetailsIcon from '@mui/icons-material/Details';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import FaxIcon from '@mui/icons-material/Fax';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClientSelected } from 'features/state/clientSelectedSlice';

const ClientCard = ({ data, theme, toggleDrawer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleDetailsClick = () => {
        navigate('/clientprofile');
        dispatch(setClientSelected(data));
    };

    const copyToClipboard = async (copyArg) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(copyArg);
                setSnackbarOpen(true);
            } else {
                // Fallback method for browsers that don't support Clipboard API
                const textarea = document.createElement('textarea');
                textarea.value = copyArg;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Failed to copy text to clipboard:", error);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setPosition({ x: draggableRef.current.state.x, y: draggableRef.current.state.y });
    }, []);

    useEffect(() => {
        setPosition({ x: 0, y: 0 });
    }, [toggleDrawer]);

    const onStop = (e, data) => {
        setPosition({ x: 0, y: data.y });
    };

    const handleGender = (gender) => {
        switch (gender) {
            case 'None':
                return '-';
            case 'Male':
                return 'Masculin';
            case 'Female':
                return 'Féminin';
            default:
                return '-';
        }
    }

    return (
        <Draggable axis="y" position={position} onStop={onStop} ref={draggableRef}>
            <Grid container xs={12}>
                <Box
                    marginBottom="20px"
                    mt="20px"
                    p="20px"
                    minWidth={{
                        xs: "300px",
                        md: "450px"
                    }}
                    style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        backgroundColor: '#f3f3f3',
                        position: 'relative',
                    }}
                >
                    <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        <Box>
                            <Typography variant="h5" color={theme.palette.blue.first} fontWeight="bold" gutterBottom onClick={() => copyToClipboard(`${data?.FIRSTNAME || ''} ${data?.NAME2 || ''}`)}>
                                {`${data?.CIVILITY ? data?.CIVILITY + '.' : ''} ${data?.FIRSTNAME || ''} ${data?.NAME2 || ''}`}
                            </Typography>
                            {data?.NATIONALITY &&
                                <Typography variant="body2" component="span" style={{ fontSize: 'smaller', color: 'grey' }} onClick={() => copyToClipboard(`${data?.NATIONALITY || ''}`)}>
                                    {`${data?.NATIONALITY || ''}`}
                                </Typography>
                            }
                        </Box>
                    </Typography>

                    <hr style={{ border: '1px solid #ccc', marginBottom: '20px' }} />

                    <Grid container alignItems={"center"}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Box className="photo-box">
                                {data?.TYPECUST ?
                                    <img
                                        src={data?.TYPECUST === "Particuliers" ? require('../../assets/profileColored.png') : require('../../assets/companyColored.png')}
                                        alt={data?.TYPECUST === "Particuliers" ? "Profile" : "Société"}
                                        style={{ width: "100%", height: 124, borderRadius: 15, objectFit: 'contain' }}
                                    />
                                    :
                                    <img
                                        src={require('../../assets/client.png')}
                                        alt={"Profile"}
                                        style={{ width: "100%", height: 124, borderRadius: 15, objectFit: 'contain' }}
                                    />
                                }
                            </Box>


                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Box>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }} >
                                    <TransgenderIcon sx={{ marginRight: '.7rem', marginLeft: '.3rem', color: theme.palette.blue.first }} />
                                    Sexe
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem', color: theme.palette.blue.first }} onClick={() => copyToClipboard(handleGender(data?.GENDER))}>
                                    {handleGender(data?.GENDER)}
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ApartmentIcon sx={{ marginRight: '.7rem', marginLeft: '.3rem', color: theme.palette.blue.first }} />
                                    Site
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem', color: theme.palette.blue.first }} onClick={() => copyToClipboard(`${data?.LIBSITE || ''}`)}>
                                    {data?.LIBSITE || '-'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Box gap={1} sx={{ pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                {data?.PHONE &&
                                    <Typography
                                        title="Tél"
                                        component={"a"}
                                        href={`tel:${data.PHONE}`}
                                        sx={{ display: 'flex', alignItems: 'center', color: theme.palette.blue.first }}
                                        onClick={() => copyToClipboard(`${data.PHONE}`)}
                                    >
                                        <PhoneIcon sx={{ marginRight: '.7rem' }} />
                                        <Box color={"grey"}>{data?.PHONE}</Box>
                                    </Typography>
                                }
                                {data?.PHONEPRI &&
                                    <Typography
                                        title="Tél"
                                        component={"a"}
                                        href={`tel:${data.PHONEPRI}`}
                                        sx={{ display: 'flex', alignItems: 'center', color: theme.palette.blue.first }}
                                        onClick={() => copyToClipboard(`${data.PHONEPRI}`)}
                                    >
                                        <Box sx={{ marginRight: '2rem' }}></Box>
                                        <Box color={"grey"}>{data?.PHONEPRI}</Box>
                                    </Typography>
                                }
                                {data?.FAX &&
                                    <Typography
                                        title="Tél"
                                        component={"a"}
                                        href={`tel:${data.FAX}`}
                                        sx={{ display: 'flex', alignItems: 'center', color: theme.palette.blue.first }}
                                        onClick={() => copyToClipboard(`${data.FAX}`)}
                                    >
                                        <FaxIcon sx={{ marginRight: '.7rem' }} />
                                        <Box color={"grey"}>{data?.FAX}</Box>
                                    </Typography>
                                }
                                {data?.EMAIL &&
                                    <Typography
                                        title="Email"
                                        component={"a"}
                                        href={`mailto:${data.EMAIL}`}
                                        sx={{ display: 'flex', alignItems: 'center', color: theme.palette.blue.first }}
                                        onClick={() => copyToClipboard(`${data.EMAIL}`)}
                                    >
                                        <EmailIcon sx={{ marginRight: '.7rem' }} />
                                        <Box color={"grey"}>{data?.EMAIL}</Box>
                                    </Typography>
                                }
                                {data?.ADDRESS &&
                                    <Typography title="Adresse" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.blue.first }} onClick={() => copyToClipboard(`${data.ADDRESS}`)}>
                                        <HomeIcon sx={{ marginRight: '.7rem' }} />
                                        <Box color={"grey"}>{data?.ADDRESS}</Box>
                                    </Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Box ml="1.5rem" gap={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
                                <Box sx={{
                                    width: '70%',
                                    mt: {
                                        xs: 3
                                    }
                                }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleDetailsClick}
                                        sx={{
                                            backgroundColor: theme.palette.blue.first,
                                            color: theme.palette.white.first,
                                            fontWeight: 'bold',
                                            "&:hover": {
                                                backgroundColor: theme.palette.blue.first,
                                            }
                                        }}
                                    >
                                        Détails
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
                <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleCloseSnackbar}>
                    <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                        Copié!
                    </Alert>
                </Snackbar>
            </Grid>
        </Draggable>

    );
};

export default ClientCard;