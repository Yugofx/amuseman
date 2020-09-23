import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { GAME_ROUTES } from '../routes/gameRoutes';
import { AudioDataContext } from '../common/AudioProvider';

export function Games() {
    const { path } = useRouteMatch();
    const audioPermissions = useContext(AudioDataContext);

    const gameRoutes = GAME_ROUTES.map(route =>
        <Route key={route.pathFragment}
               path={path + '/' + route.pathFragment}
               component={route.component}/>)

    return (
        <Switch>
            <Route path={path} exact={true} component={() => (
                <div>Games page placeholder. Audio permissions: {audioPermissions.canUse ? 'has' : 'no'}</div>
            )}/>
            {gameRoutes}
        </Switch>
    );
}