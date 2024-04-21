import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "./header.module.css";
import { Grid } from '@mui/material';
import MemoryCard from '../memory-card/sub-components/card';
import { CreatingMemoryCard } from '../creating-memory/creatingMemory';
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

  return (<>
    <Box className={styles.container}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="h3" component="div" className="flex-grow-1">
            Memorial <img className="ms-2 mb-1" src={memories} alt="icon" height="50" />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Box padding={2} className={`mt-2 ${styles.boxCard}`}>
      <Grid container spacing={1} width={"90%"} className="d-flex justify-content-center">
        <Grid xs={6} className="cardDivGrid d-flex flex-wrap overflow-auto" maxHeight={600}>
          { !_isMounted && cards.map((item ) => {
            return <Grid container spacing={1} width={330}>
              <Grid xs padding={1}>
                <MemoryCard card={item}/>
              </Grid>
            {/* <Grid xs padding={1}>
            <MemoryCard card={item}/>
            </Grid> */}
          </Grid>;
        })}
        </Grid>
        <Grid xs padding={1} paddingLeft={10} marginTop={-1} className="d-flex justify-content-center">
           <CreatingMemoryCard {...{_setIsMounted}}/>
        </Grid>
      </Grid>
    </Box>
  </>
  );
}

export default Header;