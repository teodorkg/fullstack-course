import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTypography-colorPrimary": {
      color: "white",
      whiteSpace: "nowrap",
    },
    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  menu: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar({ user, setUser }) {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.menu}>
            {user.username && (
              <Typography variant="h6" className={classes.title}>
                <Link
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    history.push("/recipe");
                  }}
                >
                  Add recipe
                </Link>
              </Typography>
            )}
            {user.username && <div className="divider">|</div>}
            <Typography variant="h6" className={classes.title}>
              <Link
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  history.push("/recipes");
                }}
              >
                Recipes
              </Link>
            </Typography>
            {!user.username && <div className="divider">|</div>}
            {!user.username && (
              <Typography variant="h6" className={classes.title}>
                <Link
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    history.push("/login");
                  }}
                >
                  Login
                </Link>
              </Typography>
            )}
            {!user.username && <div className="divider">|</div>}
            {!user.username && (
              <Typography variant="h6" className={classes.title}>
                <Link
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    history.push("/register");
                  }}
                >
                  Register
                </Link>
              </Typography>
            )}
          </div>
          {user.username && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push("/register");
                  }}
                >
                  Modify
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setUser({ username: "" });
                    history.push("/");
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
