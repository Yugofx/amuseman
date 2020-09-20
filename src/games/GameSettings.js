import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: theme.spacing(2),
    },
    select: {
        marginRight: theme.spacing(2)
    },
}));

export function GameSettings(props) {
    const classes = useStyles();
    const levelOptions = [];
    const gamesOptions = (props.games || []).map(game => <MenuItem key={game.id} value={game.id}>{game.label}</MenuItem>);
    for (let i = 0; i < props.levels || 0; i++) {
        levelOptions.push(<MenuItem key={i} value={i + 1}>Level { i + 1 }</MenuItem>);
    }

    function setLevel(event) {
        props.onLevelChange(event.target.value);
    }

    function setGame(event) {
        props.onGameChange(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Select className={classes.select}
                    value={props.level}
                    disabled={!props.levels}
                    displayEmpty
                    onChange={setLevel}>
                <MenuItem value={0}>Select Level</MenuItem>
                { levelOptions }
            </Select>
            <Select className={classes.select}
                    value={props.gameId}
                    displayEmpty
                    onChange={setGame}>
                <MenuItem value={-1}>Select Game</MenuItem>
                {gamesOptions}
            </Select>
        </div>
    );
}