import { Box, Card, CardContent, CircularProgress, Grid, Skeleton, Typography, useTheme } from "@mui/material";
import dayjs from 'dayjs';

const ClientParkList = ({ parcClientData, viewDetailParc, setPage, isLoading }) => {

    const theme = useTheme();

    const onScroll = (event) => {
        var element = event.target;
        if (
            (Math.round(element.scrollHeight - element.scrollTop) === Math.round(element.clientHeight)) ||
            (Math.round(element.scrollHeight - element.scrollTop) === Math.round(element.clientHeight) + 1)
        ) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <>
            <div style={{
                overflowY: 'scroll',
                maxHeight: '340px',
                marginTop: '0',
            }}
                onScroll={onScroll}
            >
                {parcClientData?.map((data, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                cursor: "pointer",
                                marginBottom: "20px",
                                "&:last-child": {
                                    marginBottom: "0"
                                }
                            }}
                            onClick={() => {
                                viewDetailParc(data)
                            }}
                        >
                            <Card sx={{
                                backgroundColor: theme.palette.blue.second,
                                borderRadius: '10px',
                                boxShadow: 'none'
                            }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Typography variant="subtitle1" component="h3">
                                                Marque
                                            </Typography>
                                            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                                                {data?.MARQUE || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Typography variant="subtitle1" component="h3">
                                                Version
                                            </Typography>
                                            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                                                {data?.VERSION || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Typography variant="subtitle1" component="h3">
                                                Modèle
                                            </Typography>
                                            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                                                {data?.MODELE || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Typography variant="subtitle1" component="h3">
                                                Mode d'acquisition
                                            </Typography>
                                            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                                                {data?.TYPE_FINANCEMENT || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Typography variant="subtitle1" component="h3">
                                                Date d'achat
                                            </Typography>
                                            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                                                {data?.DATE_FACTURE ? dayjs(data?.DATE_FACTURE).format('YYYY-MM-DD') : '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Typography variant="subtitle1" component="h3">
                                                Site
                                            </Typography>
                                            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                                                {data?.SITE || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    )
                })}
                {isLoading &&
                    <Box sx={{ display: "flex", justifyContent: 'center', gap: 1 }}>
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                    </Box>
                }
            </div>
        </>
    );
}

export default ClientParkList;

const SkeletonLoading = () => <Skeleton variant="text" sx={{ fontSize: '24px', width: '16px', height: '26px', borderRadius: '100%' }} />