import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UserAvatar from "../common/UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipesCards({ recipes }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);

  const handleExpandClick = (id) => {
    expanded.includes(id)
      ? setExpanded(expanded.filter((elemId) => elemId !== id))
      : setExpanded([...expanded, id]);
  };

  return recipes.map((recipe) => (
    <Card className={classes.root} key={recipe.id}>
      <CardHeader
        avatar={
          <UserAvatar
            nickname={recipe.creator.nickname || recipe.creator.username}
            avatarSrc={recipe.creator.avatarSrc}
            sex={recipe.creator.sex}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.title}
        subheader={recipe.timeCreated}
      />
      <CardMedia
        className={classes.media}
        image={recipe.pictureSrc}
        title={recipe.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.shortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded.includes(recipe.id),
          })}
          onClick={() => handleExpandClick(recipe.id)}
          aria-expanded={expanded.includes(recipe.id)}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded.includes(recipe.id)} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {recipe.description.slice(0, 150)}
            {recipe.description.length > 150 && "..."}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  ));
}
