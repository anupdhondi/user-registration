import { useState, useReducer } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type State = {
  email: string;
  password: string;
};

type Action = { type: "INPUT_CHANGED"; value: string; id: string };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INPUT_CHANGED":
      if (action.id === "email") {
        return { ...state, email: action.value };
      }
      return { ...state, password: action.value };
    default:
      return state;
  }
}

export default function SignIn() {
  const classes = useStyles();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [{ email, password }, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
  });

  function switchModeHandler(): void {
    setIsLoginMode((prevMode) => !prevMode);
  }

  function inputChangedHandler(value: string, id: string) {
    dispatch({
      type: "INPUT_CHANGED",
      value,
      id,
    });
  }

  function onSubmitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => inputChangedHandler(e.target.value, "email")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => inputChangedHandler(e.target.value, "password")}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={switchModeHandler}>
                {isLoginMode ? "Don't have an account? Sign Up" : "Have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
