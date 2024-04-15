import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailsIcon from '@mui/icons-material/Details';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import FaxIcon from '@mui/icons-material/Fax';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Profil from '../../assets/client.png'

const ClientCard = ({ data, theme, toggleDrawer }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate('/clientprofile', { state: { data } });

    };

    const contact = {
        name: 'John Doe',
        company: 'XYZ Corporation',
        position: 'CEO',
        manager: 'Jane Smith',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St, Anytown, USA',
        image: 'https://via.placeholder.com/150',
        opportunities: [
            { name: 'Opportunity 1', price: '$1000' },
            { name: 'Opportunity 2', price: '$2000' },
        ],
        activities: [
            { name: 'Meeting with client', date: '2024-03-18' },
            { name: 'Follow-up call', date: '2024-03-17' },

        ],
    };

    const renderCustomOpportunities = () => {
        return contact.opportunities.map((item, idx) => (
            <div className='opportunities' key={idx}>
                <span className='value'>{item.name}</span>
                <br />
                <span className='value black small'>{item.price}</span>
            </div>
        ));
    };

    const renderCustomActivities = () => {
        return contact.activities.map((activity, idx) => (
            <div key={idx}>
                <span>{activity.name}</span>
                <span>{activity.date}</span>
            </div>
        ));
    };
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const copyToClipboard = async (copyArg) => {
        try {
            setSnackbarOpen(false);
            setTimeout(() => {
                setSnackbarOpen(true);
            }, 200);
            await navigator.clipboard.writeText(copyArg);
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
                            <Typography variant="h5" fontWeight="bold" gutterBottom onClick={() => copyToClipboard(`${data?.FIRSTNAME} ${data?.NAME2}`)}>
                                {`${data?.CIVILITY || ''}${data?.FIRSTNAME || ''} ${data?.NAME2 || ''}`}
                            </Typography>
                            {data?.NATIONALITY &&
                                <Typography variant="body2" component="span" style={{ fontSize: 'smaller', color: 'grey' }} onClick={() => copyToClipboard(`${data?.NATIONALITY}`)}>
                                    {`${data?.NATIONALITY || ''}`}
                                </Typography>
                            }
                        </Box>
                    </Typography>

                    <hr style={{ border: '1px solid #ccc', marginBottom: '20px' }} />

                    <Grid container alignItems={"center"}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Box className="photo-box">
                                <img src={Profil} alt="Profile" style={{ width: "100%", height: 124, borderRadius: 15, objectFit: 'contain' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Box>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }} >
                                    <AssuredWorkloadIcon sx={{ marginRight: '.7rem', marginLeft: '.3rem' }} />
                                    Entreprise
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem', color: theme.palette.secondary.light }} onClick={() => copyToClipboard(`${data?.ENTREPRISE}`)}>
                                    {`${data?.ENTREPRISE || '-'}`}
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    <BusinessCenterIcon sx={{ marginRight: '.7rem', marginLeft: '.3rem' }} />
                                    Poste
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem', color: theme.palette.secondary.light }} onClick={() => copyToClipboard(`${data?.POSTE}`)}>
                                    {data?.POSTE || '-'}
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    <SupervisorAccountIcon sx={{ marginRight: '.7rem', marginLeft: '.3rem' }} />
                                    Assigné à
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem', color: theme.palette.secondary.light }} onClick={() => copyToClipboard(`${contact.manager}`)}>
                                    {contact.manager || '-'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Box gap={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                {data?.PHONE &&
                                    <Typography
                                        title="Tél"
                                        component={"a"}
                                        href={`tel:${data.PHONE}`}
                                        sx={{ display: 'flex', alignItems: 'center', color: theme.palette.secondary.light }}
                                        onClick={() => copyToClipboard(`${data.PHONE}`)}
                                    >
                                        <PhoneIcon sx={{ marginRight: '.7rem' }} />
                                        {data?.PHONE}
                                    </Typography>
                                }
                                {data?.EMAIL &&
                                    <Typography
                                        title="Email"
                                        component={"a"}
                                        href={`mailto:${data.EMAIL}`}
                                        sx={{ display: 'flex', alignItems: 'center', color: theme.palette.secondary.light }}
                                        onClick={() => copyToClipboard(`${data.EMAIL}`)}
                                    >
                                        <EmailIcon sx={{ marginRight: '.7rem' }} />
                                        {data?.EMAIL}
                                    </Typography>
                                }
                                {data?.ADDRESS &&
                                    <Typography title="Adresse" sx={{ display: 'flex', alignItems: 'center' }} onClick={() => copyToClipboard(`${data.ADDRESS}`)}>
                                        <HomeIcon sx={{ marginRight: '.7rem' }} />
                                        {data?.ADDRESS}
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
                                        startIcon={<DetailsIcon />}
                                        fullWidth
                                        onClick={handleDetailsClick}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        Détails
                                    </Button>
                                </Box>
                                {/* <Box sx={{ width: '50%' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<MoreVertIcon />}
                                        fullWidth
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: 'transparent'
                                            }
                                        }}>
                                        Actions
                                    </Button>
                                </Box> */}
                            </Box>
                        </Grid>

                    </Grid>
                    {/* <Box mt={2}>
                        <Accordion sx={{ backgroundColor: theme.palette.background.alt }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="opportunities-content"
                                id="opportunities-header"
                            >
                                <Typography variant="subtitle1">Opportunités</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <hr style={{ border: '1px solid #a3a3a3' }} />

                                {renderCustomOpportunities()}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{ backgroundColor: theme.palette.background.alt }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="activities-content"
                                id="activities-header"
                            >
                                <Typography variant="subtitle1">Activités</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <hr style={{ border: '1px solid #a3a3a3' }} />

                                {renderCustomActivities()}
                            </AccordionDetails>
                        </Accordion>
                    </Box> */}
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