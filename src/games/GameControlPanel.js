import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    button: {
        '& + &': {
            marginLeft: theme.spacing(2)
        }
    }
}));

export function GameControlPanel(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.isStarted
                ? <Button className={classes.button}
                          variant="contained"
                          disabled={!props.isStarted || props.isSubmitted}
                          color="primary"
                          onClick={props.onSubmit}>
                    Submit Answer
                </Button>
                : null
            }
            <Button className={classes.button}
                    variant="contained"
                    disabled={!props.isGameSelected}
                    color="primary"
                    onClick={() => props.onStart(!props.isStarted)}>
                {props.isStarted ? 'Stop' : 'Start'}
            </Button>
            <Button className={classes.button}
                    variant="contained"
                    disabled={!props.isStarted || !props.isGameSelected}
                    color="primary"
                    onClick={props.onRestart}>
                Restart
            </Button>
        </div>
    );
}
