import MultiLineInput from "../../components/Inputs/MultiLineInput"
import WordCountLimit from "./WordCountLimit"
import { Grid } from "@mui/material"

const PostContent = ({ rows, handleContentChange, postContent }) => {
  return (
    <>
      <Grid item xs>
        {/* Enter the post contents */}
        <MultiLineInput
          placeholder="Add contents..."
          rows={rows}
          handleChange={handleContentChange}
        />
      </Grid>
      <WordCountLimit content={postContent} count={1000} />
    </>
  )
}

export default PostContent