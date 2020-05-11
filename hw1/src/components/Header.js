import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import UserAvatar from "./UserAvatar";

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
    "& .active": {
      textDecoration: "underline",
    },
  },
  menu: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar({ user, setUser, setRegUser }) {
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

  const [active, setActive] = React.useState(
    history.location.pathname.split("/")[1]
  );

  React.useEffect(() => {
    setActive(history.location.pathname.split("/")[1]);
  }, [history.location]);

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
                  className={active === "recipe" ? "active" : ""}
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
                className={active === "recipes" ? "active" : ""}
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
                  className={active === "login" ? "active" : ""}
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
                    history.push("/user");
                  }}
                  className={active === "user" ? "active" : ""}
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
                <UserAvatar
                  nickname={user.nickname || user.username}
                  avatarSrc={user.avatarSrc}
                  sex={user.sex}
                  invert={true}
                />
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
                    setRegUser({ ...user });
                    history.push("/user");
                  }}
                >
                  Modify
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setUser({ username: "" });
                    setRegUser({ username: "" });
                    history.push("/");
                  }}
                >
                  Log out
                </MenuItem>
                {user.isAdmin && (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      history.push("/users");
                    }}
                    id={"manage-users-menu"}
                  >
                    Manage users
                  </MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
