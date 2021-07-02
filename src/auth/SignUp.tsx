import { useState, useReducer, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import CancelIcon from "@material-ui/icons/Cancel";
import MenuItem from "@material-ui/core/MenuItem";

import { AuthContext } from "../App";

import { useStyles } from "./LogIn";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   paper1: {
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     textAlign: "center",
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

type State = {
  email: string;
  password: string;
  role: string;
};

type Action = { type: "INPUT_CHANGED"; value: string; id: string };

const roles = ["Admin", "Partial Admin", "User"];

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INPUT_CHANGED":
      if (action.id === "email") {
        return { ...state, email: action.value };
      } else if (action.id === "password") {
        return { ...state, password: action.value };
      } else {
        return { ...state, role: action.value };
      }
    default:
      return state;
  }
}

export default function SignIn() {
  const classes = useStyles();
  const [{ email, password, role }, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
    role: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const context = useContext(AuthContext);

  const history = useHistory();

  function inputChangedHandler(value: string, id: string) {
    dispatch({
      type: "INPUT_CHANGED",
      value,
      id,
    });
  }

  async function onSubmitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      console.log({ email, password, role });
      //const responseData = await axios.post("url...", { email, password, role });
      //await new Promise((resolve, reject) => reject());
      context.login();
      history.replace("/login");
    } catch (err) {
      handleOpen();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SIGNUP
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
          <TextField
            variant="outlined"
            margin="normal"
            select
            required
            fullWidth
            name="role"
            label="role"
            type="role"
            id="role"
            value={role}
            onChange={(e) => inputChangedHandler(e.target.value, "role")}>
            {roles.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            SIGNUP
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" to="/login">
                Have an account? Just Login
              </Link>
            </Grid>
          </Grid>
        </form>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={open}>
            <div className={classes.paper1}>
              <CancelIcon style={{ color: "red", fontSize: "70px" }} onClick={handleClose}></CancelIcon>{" "}
              <h2 id="transition-modal-title">Error</h2>
              <p id="transition-modal-description">Something went wrong</p>
            </div>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
}
