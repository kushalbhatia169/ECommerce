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
import testQuote from "../../../images/textQuote.png";
import styles from "../memoryCard.module.css";
import { cardState } from '../../../types/memoryCard.types';
import { DELETE_POST } from '../../../graphql/posts.query';
import { useMutation } from '@apollo/client';

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
  setPollingOnAction: () => void;
}

export const MemoryCard = (props: MemoryCardProps) => {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const {createdAt} = props.card;
  console.log(props, createdAt);
  const [deletePost] = useMutation(DELETE_POST,{
    onCompleted({deletePost}){
        const {err, msg} = deletePost;
        if(msg) {
          props.setPollingOnAction();
          console.log(msg);
        }
        if(err) {
          console.error(err);
        }
    },
    onError(error){
        console.log("An Error Occured.", error)
    }
});

  return (
    <Card className={styles.memoryCard}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="creatorName">
            {props?.card?.creator?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        className={styles.cardHeader}
        title={props?.card?.creator}
        subheader={new Date(createdAt).toISOString().slice(0, 10)}
      >
      </CardHeader>
      <CardMedia
        component="img"
        height="200"
        image={props.card.selectedFile || testQuote}
        alt="Paella dish"
        />
      <CardContent className={styles.memoryCardContent}>
        <Typography variant="body2" color="text.primary">
          {props?.card?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props?.card?.message}
        </Typography>
      </CardContent>
      <CardActions className="d-flex justify-content-between">
        <IconButton aria-label="Like">
          <ThumbUp /> {props?.card?.likeCount !== 0 ? props?.card?.likeCount : ""}
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => {
          deletePost({
            variables : {
              id: props.card.id
            }
          })
        }}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MemoryCard;