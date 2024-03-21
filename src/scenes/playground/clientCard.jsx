import React from 'react';
import { Grid, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailsIcon from '@mui/icons-material/Details';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CloseIcon from '@mui/icons-material/Close';


const ClientCard = ({ data, theme , toggleDrawer }) => {

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

    return (
        <Grid container xs={12} sm={12} md={12} lg={11} xl={3}>
            <Box
                marginBottom="20px"
                mt="20px"
                p="20px"
                style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: '#f3f3f3', position: 'relative' }}
            >
                <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                   Name LastName
                </Typography>
                <hr style={{ border: '1px solid #ccc', marginBottom: '20px' }} />
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box className="photo-box">
                            <img src={contact.image} alt="Profile" style={{ width: 124, height: 124 ,borderRadius:15 }} />
                          



                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <Box>
                        <Typography  sx={{ display: 'flex', alignItems: 'center' }}>
                                <AssuredWorkloadIcon sx={{ marginRight: '.7rem' }} />
                                Entreprise
                            </Typography>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' ,marginLeft: '2rem' ,color:theme.palette.secondary.light}}>
                                {contact.company}
                            </Typography>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' }}>
                            <BusinessCenterIcon sx={{ marginRight: '.7rem'}} />
                            Poste
                            </Typography>

                            <Typography  sx={{ display: 'flex', alignItems: 'center' ,marginLeft: '2rem' ,color:theme.palette.secondary.light}}>
                                {contact.position}
                            </Typography>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' }}>
                                <SupervisorAccountIcon sx={{ marginRight: '.7rem'}} />
                                Assigné à
                            </Typography>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' ,marginLeft: '2rem' ,color:theme.palette.secondary.light}}>
                                {contact.manager}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon sx={{ marginRight: '.7rem' }} />
                                {contact.phone}
                            </Typography>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ marginRight: '.7rem' }} />
                                {contact.email}
                            </Typography>
                            <Typography  sx={{ display: 'flex', alignItems: 'center' }}>
                                <HomeIcon sx={{ marginRight: '.7rem' }} />
                                {contact.address}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box ml="1.5rem" gap={2}  sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
                            <Box sx={{ width: '50%' }}>
                                <Button variant="contained" startIcon={<DetailsIcon />} fullWidth>Détails</Button>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Button variant="contained" startIcon={<MoreVertIcon />} fullWidth>Actions</Button>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
                <Box mt={2}>
                    <Accordion sx={{backgroundColor: theme.palette.background.alt}}
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
                    <Accordion sx={{backgroundColor: theme.palette.background.alt}}
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
                </Box>
            </Box>
        </Grid>
    );
};

export default ClientCard;
