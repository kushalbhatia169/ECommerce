import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField/TextField';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useCallback, useRef, useState } from 'react';
import styles from "./creatingMemory.module.css";
import axios from 'axios';
import { convertBase64 } from '../../helpers/getBlobFromFile';
import { creatingMemoryProps } from '../../types/card-state.types';

interface creatorMemoryState {
  creator: string;
  title: string;
  message: string;
  tags: string[];
  file: string | ArrayBuffer | null
}

const initialState = {
  creator: "",
  title: "",
  message: "",
  tags: [],
  file: ""
}
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

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

export const CreatingMemoryCard = (props: creatingMemoryProps) => {
  const [creatorMemoryState, setCreatorMemoryState] = useState<creatorMemoryState>(initialState);
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);
  const [errorKey, setErrorKey] = useState<string[]>([]);

  const creatorRef = useRef<HTMLInputElement>(null);
  const titleRef =  useRef<HTMLInputElement>(null);
  const messageRef =  useRef<HTMLInputElement>(null);
  const tagsRef =  useRef<HTMLInputElement>(null);


  const handleOnChange = useCallback((keyVal: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e?.target.value) {
      setCreatorMemoryState({
        ...creatorMemoryState,
        [keyVal]: e.target.value
      });

      setErrorKey(errorKey.filter(i => i !== keyVal));
    } else {
      setCreatorMemoryState({
        ...creatorMemoryState,
        [keyVal]: ""
      });

      setErrorKey([...errorKey, keyVal]);

      if(Object.values(creatorMemoryState).some(value => value === '')) {
        setIsAnyFieldEmpty(true);
      }
    }
  },[creatorMemoryState, errorKey]);

  const handleSubmit = () => {
    const fieldsToCheck = ["creator", "title", "message", "tags"];
    let focusRef = null;

    const emptyFields = fieldsToCheck.filter(field => !creatorMemoryState[field as keyof creatorMemoryState]);

    if (emptyFields.length > 0) {
      setErrorKey(emptyFields);
      focusRef = emptyFields[0] === "creator" ? creatorRef :
                  emptyFields[0] === "title" ? titleRef :
                  emptyFields[0] === "message" ? messageRef : tagsRef;
    }

    if (focusRef) {
      focusRef.current?.focus();
      setIsAnyFieldEmpty(true);
    } else {
      axios.put("http://localhost:3000/posts/createPost", {
        title: creatorMemoryState[fieldsToCheck[1] as keyof creatorMemoryState],
        message: creatorMemoryState[fieldsToCheck[2] as keyof creatorMemoryState],
        creator: creatorMemoryState[fieldsToCheck[0] as keyof creatorMemoryState],
        tags: creatorMemoryState[fieldsToCheck[3] as keyof creatorMemoryState], 
        selectedFile: creatorMemoryState['file']
      })
      .then((res) => {
        if(res?.status === 200) {
          props._setIsMounted(true);
          console.log(res.data.message);
        } else {
          throw new Error("Sorry your memory can not be saved");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  };

  const getErrorStatus = (getErrorStatus: string) => {
    return errorKey.includes(getErrorStatus) ? true :false;
  }

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(event.target.files) {
      const file = event.target.files[0];
      const base64 = await convertBase64(file);
      console.log(base64);

      try {
        if(base64) {
          setCreatorMemoryState({
            ...creatorMemoryState,
            file: base64
          });
        } else {
          throw new Error("base64 does not created");
        }
      } catch(error) {
        if(error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  }

  return (
    <Card className={styles.creatingMemoryCard}>
      <CardHeader
        title="Create a memory"
      />
      {isAnyFieldEmpty && <span className="ms-3" style={{color: red[500]}}>*All fields Should have some value.</span>}
      <CardContent>
        <TextField 
          fullWidth
          id="outlined-basic"
          label="Creator"
          variant="outlined"
          className="mt-2"
          value={creatorMemoryState.creator}
          onChange={item => {
            return handleOnChange("creator", item);
          }}
          inputRef={creatorRef}
          error={getErrorStatus("creator")}
        />
        <TextField 
          fullWidth
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className="mt-2"
          value={creatorMemoryState.title}
          onChange={item => {
            return handleOnChange("title", item);
          }}
          inputRef={titleRef}
          error={getErrorStatus("title")}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          className="mt-2"
          value={creatorMemoryState.message}
          onChange={item => {
            return handleOnChange("message", item);
          }}
          inputRef={messageRef}
          error={getErrorStatus("message")}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tags (comma seprated)"
          variant="outlined"
          className="mt-2"
          value={creatorMemoryState.tags}
          onChange={item => {
            return handleOnChange("tags", item);
          }}
          inputRef={tagsRef}
          error={getErrorStatus("tags")}
        />
        <input type="file" className="mt-3" onChange={handleUploadFile}/>
      </CardContent>
      <hr className="ms-2 me-2"/>
      <CardActions className="d-flex flex-column">
        <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" fullWidth className={`mt-2 ${styles.clearButton}`} onClick={()=> {
          setIsAnyFieldEmpty(false);
          setErrorKey([]);
          return setCreatorMemoryState(initialState);
        }}> Clear</Button>
      </CardActions>
    </Card>
  );
}

export default CreatingMemoryCard;
