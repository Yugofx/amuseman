import React, {useState} from 'react';
import {Container} from "@material-ui/core";
import {GameSettings} from "./GameSettings";
import {Game} from "./Game";
import {GameControlPanel} from "./GameControlPanel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        flexShrink: 0,
        flexGrow: 0,
    },
    game: {
        flexGrow: 1
    }
}));

export function GameBoard() {
    const classes = useStyles();
    const [isStarted, setStarted] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const [level, setLevel] = useState(0);
    const [gameId, setGameId] = useState(-1);

    function handleRestart() {
        setStarted(false);
        setSubmitted(false);
        setTimeout(() => setStarted(true));
    }

    return (
        <Container className={classes.root}>
            <GameSettings className={classes.header}
                          level={level}
                          onLevelChange={setLevel}
                          levels={3}
                          games={[{id: 0, label: 'Scale Writer'}]}
                          gameId={gameId}
                          onGameChange={setGameId}/>
            <Game gameId={gameId}
                  isStarted={isStarted}
                  isSubmitted={isSubmitted}/>
            <GameControlPanel isStarted={isStarted}
                              isSubmitted={isSubmitted}
                              isGameSelected={gameId >= 0}
                              onStart={setStarted}
                              onRestart={handleRestart}
                              onSubmit={() => setSubmitted(true)}/>
        </Container>
    );
}