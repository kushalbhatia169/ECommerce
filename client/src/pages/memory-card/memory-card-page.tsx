import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import MemoryCard from './sub-components/memory-card';
import { CreatingMemoryCard } from './sub-components/creating-memory/creatingMemory';
import { cardState } from '../../types/memoryCard.types';
import { GET_POSTS } from '../../graphql/posts.query';
import { useQuery } from '@apollo/react-hooks';

export const MemoryCardPage = () => {
  const {loading, data} = useQuery(GET_POSTS,{
    pollInterval: 0
  });

  if(loading) return <div>Loading</div>

  return (
    <Box padding={2} className={`mt-2 d-flex justify-content-center flex-grow-1`}>
      <Grid container spacing={1} width={"90%"} className="d-flex justify-content-center">
        <Grid xs={6} className="d-flex flex-wrap overflow-auto" maxHeight={600}>
          { data.getPosts.map((item: cardState ) => {
            return <Grid container spacing={1} width={330}>
              <Grid xs padding={1}>
                <MemoryCard card={item}/>
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