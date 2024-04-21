import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import MemoryCard from './sub-components/memory-card';
import { CreatingMemoryCard } from './sub-components/creating-memory/creatingMemory';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cardState } from './types/memoryCard.types';

export const MemoryCardPage = () => {
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
    <Box padding={2} className={`mt-2 d-flex justify-content-center flex-grow-1`}>
      <Grid container spacing={1} width={"90%"} className="d-flex justify-content-center">
        <Grid xs={6} className="d-flex flex-wrap overflow-auto" maxHeight={600}>
          { !_isMounted && cards.map((item ) => {
            return <Grid container spacing={1} width={330}>
              <Grid xs padding={1}>
                <MemoryCard card={item}/>
              </Grid>
          </Grid>;
        })}
        </Grid>
        <Grid xs padding={1} paddingLeft={10} marginTop={-1} className="d-flex justify-content-center">
           <CreatingMemoryCard {...{_setIsMounted}}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MemoryCardPage;