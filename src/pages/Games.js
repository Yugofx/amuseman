import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { GAME_ROUTES } from '../routes/gameRoutes';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AudioStateContext } from '../common/AudioProvider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    link: { textDecoration: 'none' }
});

export function Games() {
    const classes = useStyles();
    const { canUseAudioInput } = useContext(AudioStateContext);
    const { path } = useRouteMatch();

    const gameRoutes = GAME_ROUTES.map(route =>
        <Route key={route.pathFragment}
               path={path + '/' + route.pathFragment}
               component={route.component}/>)

    const gameCards = GAME_ROUTES.map(route =>
        <Grid item xs={3} key={path + '/' + route.pathFragment}>
            <Card variant="outlined">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {route.category}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {route.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {route.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title="Grant permissions to use microphone"
                             disableHoverListener={route.category !== 'voice' || canUseAudioInput}>
                        <Link className={classes.link} to={path + '/' + route.pathFragment}>
                            <Button variant="contained"
                                    disabled={route.category === 'voice' && !canUseAudioInput}
                                    size="small"
                                    color="primary">
                                Play
                            </Button>
                        </Link>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    );

    return (
        <Switch>
            <Route path={path} exact={true} component={() => (
                <Grid container spacing={3}>
                    {gameCards}
                </Grid>
            )}/>
            {gameRoutes}
        </Switch>
    );
}