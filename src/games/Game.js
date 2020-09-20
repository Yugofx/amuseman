import React from 'react';
import {ScaleWriter} from "./ScaleWriter";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    board: {
        flexGrow: 1,
    },
    emptyBoard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        fontWeight: 700,
        fontSize: 50,
        color: theme.palette.error.light
    }
}));

export function Game({ gameId, isStarted, isSubmitted }) {
    const { board, emptyBoard } = useStyles();

    switch (gameId) {
        case 0: return (<ScaleWriter className={board}
                                     isStarted={isStarted}
                                     isSubmitted={isSubmitted} />)
        default: return (<div className={emptyBoard}>Game is not selected</div>);
    }
}