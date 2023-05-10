import SingleLineInput from '../../components/Inputs/SingleLineInput';
import WordCountLimit from './WordCountLimit';
import { Grid } from '@mui/material';

const PostTitle = ({ titleContent, handleTitleChange }) => {
  return (
    <>
      <Grid item xs={1}>
        <SingleLineInput
          placeholder="Add a title..."
          handleChange={handleTitleChange}
        />
      </Grid>
      <WordCountLimit content={titleContent} count={20} />
    </>
  )
}

export default PostTitle;