import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, ThumbUp } from '@mui/icons-material';
import testQuote from "../../images/textQuote.png";
import styles from "./memoryCard.module.css";
import { cardState } from './header';

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
interface MemoryCardProps {
  card: cardState;
}

export const MemoryCard = (props: MemoryCardProps) => {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const {createdAt} = props.card;
  console.log(props, createdAt);

  return (
    <Card sx={{ maxWidth: 350, maxHeight: 450, borderRadius: "1rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="creatorName">
            {props?.card?.title?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        className={styles.cardHeader}
        title={props?.card?.title}
        subheader={new Date(createdAt).toISOString().slice(0, 10)}
      />
      <CardMedia
        component="img"
        height="124"
        image={testQuote}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props?.card?.message}
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
        <IconButton aria-label="Like">
          <ThumbUp /> {props?.card?.likeCount !== 0 ? props?.card?.likeCount : ""}
        </IconButton>
        <IconButton aria-label="Delete">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MemoryCard;