import { makeStyles } from "@mui/material";

export const useStyles =  makeStyles({
  header: {
    backgroundImage: 'url("/path/to/your/image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', // Set text color to white for better visibility
  },
  container: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: "2rem"
  },
  appBar: {
    textAlign: "center",
    borderRadius: "2.5rem",
    width: "85% !important",
    backgroundColor: "azure !important",
    color: "rgba(0,183,255, 1) !important",
    outline: "invert"
  }
});