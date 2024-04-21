import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "./header.module.css";
import memories from "../../images/memories.png";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cardState } from '../memory-card/types/memoryCard.types';

export const Header = () => {
  const [cards, setCards] = useState<cardState[] | []>([]);
  const [_isMounted, _setIsMounted] = useState(true);

  useEffect(() => {
    if(_isMounted) {
      axios
        .get("http://localhost:3000/posts/getPosts")
        .then((res) => {
          if(res.status === 200) {
            setCards(res.data.posts);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return(() => {
      _setIsMounted(false);
    });
  }, [cards, _isMounted]);

  return (
    <Box className={styles.container}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="h3" component="div" className="flex-grow-1">
            Memorial <img className="ms-2 mb-1" src={memories} alt="icon" height="50" />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;