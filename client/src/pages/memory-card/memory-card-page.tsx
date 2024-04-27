import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import MemoryCard from './sub-components/memory-card';
import { CreatingMemoryCard } from './sub-components/creating-memory/creatingMemory';
import { cardState } from '../../types/memoryCard.types';
import { GET_POSTS } from '../../graphql/posts.query';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';

export const MemoryCardPage = () => {
  
  const [polling, setPolling] = useState(0);
  const {loading, data} = useQuery(GET_POSTS,{
    pollInterval: polling,
  });

  if(loading) return <div>Loading</div>;

  const setPollingOnAction = () => {
    setPolling(100);
  }

  return (
    <Box padding={2} className={`mt-2 d-flex justify-content-center flex-grow-1`}>
      <Grid container spacing={1} width={"90%"} className="d-flex justify-content-center">
        <Grid xs={6} className="d-flex flex-wrap overflow-auto" maxHeight={600}>
          { data.getPosts.map((item: cardState ) => {
            {console.log("21 " +typeof  item.id)}
            return <Grid container spacing={1} width={330}>
              <Grid xs padding={1}>
                <MemoryCard card={item} setPollingOnAction={setPollingOnAction}/>
              </Grid>
          </Grid>;
        })}
        </Grid>
        <Grid xs padding={1} paddingLeft={10} marginTop={-1} className="d-flex justify-content-center">
           <CreatingMemoryCard/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MemoryCardPage;