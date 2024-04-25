import React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '10px',
    backgroundColor: '#fff',
    zIndex: 999,
    borderRadius: theme.spacing(1),
    marginRight: '12px',
    border: `1px solid ${theme.palette.secondary.light}`,
  },
  label: {
    color: theme.palette.secondary.light,
  },
}));

const RegionDataDisplay = ({ markersData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          {markersData?.results[0]?.city}
        </Typography>
        <Typography>
          <strong className={classes.label}>Count:</strong> {markersData.count} <br />
          {markersData.results.map((marker, index) => (
            <div key={index}>
              <Typography>
                <strong className={classes.label}>Name:</strong> {marker.name} <br />
                <strong className={classes.label}>Latitude:</strong> {marker.lat} <br />
                <strong className={classes.label}>Longitude:</strong> {marker.lng} <br />
                <strong className={classes.label}>Country:</strong> {marker.country} <br />
                <strong className={classes.label}>Services:</strong> {marker.services} <br />
                <strong className={classes.label}>Model Name:</strong> {marker.model_name}
              </Typography>
            </div>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RegionDataDisplay;
