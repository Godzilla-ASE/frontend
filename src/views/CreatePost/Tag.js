import { Grid, Chip, Box } from "@mui/material"
import SingleLineInput from '../../components/Inputs/SingleLineInput';

const Tag = ({ handleTagInputChange, handleTagsSubmit, tagsInput, tags, handleTagDelete }) => {
  return (
    <>
      <Grid item xs={1}>
        {/* Add tags for the post */}
        <SingleLineInput placeholder="Add tags (seperate by space)..." handleChange={handleTagInputChange} handleKeyDown={handleTagsSubmit} value={tagsInput} />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          padding: 1,
          display: 'flex',
          flexWrap: 'wrap',
          // borderBottom: '2px solid white'
        }}>
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} color="primary" variant="outlined" style={{ marginRight: '8px', marginBottom: '8px' }} onDelete={() => handleTagDelete(tag)} />
        ))}
      </Grid>
    </>
  )
}

export default Tag