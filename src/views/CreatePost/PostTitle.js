import SingleLineInput from '../../components/Inputs/SingleLineInput';
import WordCountLimit from './WordCountLimit';
import { Grid } from '@mui/material';

const PostTitle = ({ titleContent, handleTitleChange, placeholder }) => {
  return (
    <>
      <Grid item xs={1}>
        <SingleLineInput
          placeholder="Write a title..."
          handleChange={handleTitleChange}
        />
      </Grid>
      <WordCountLimit content={titleContent} placeholder={placeholder} count={20} />
    </>
  )
}

export default PostTitle;