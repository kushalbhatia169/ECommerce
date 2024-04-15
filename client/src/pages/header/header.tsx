import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "./header.module.css";
import { Grid } from '@mui/material';
import MemoryCard from './memoryCard';
import { CreatingMemoryCard } from './creatingMemory';
import memories from "../../images/memories.png";
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface cardState {
    title: string;
    message: string;
    creator: string;
    tags: string[];
    selectedFile: string;
    likeCount: number;
    createdAt: Date;
    _id: string;
}

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

  console.log(cards);

  return (<>
    <Box className={styles.container}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Memorial <img className="ms-2 mb-1" src={memories} alt="icon" height="50" />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", padding: 2 }} className="mt-2">
      <Grid container spacing={1} sx={{ display:"flex", justifyContent: "center", width: "75%"}}>
        <Grid xs={6}>
          { !_isMounted && cards.map((item ) => {
            return <Grid container spacing={1}>
              <Grid xs padding={1}>
                <MemoryCard card={item}/>
              </Grid>
            <Grid xs padding={1}>
            <MemoryCard card={item}/>
            </Grid>
          </Grid>;
        })}
        </Grid>
        <Grid xs padding={1} paddingLeft={10} sx={{display:"flex", justifyContent:"center", marginTop: -1}}>
           <CreatingMemoryCard/>
        </Grid>
      </Grid>
    </Box>
  </>
  );
}

export default Header;