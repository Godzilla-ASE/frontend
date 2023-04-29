import { Grid, Typography } from "@mui/material"

const placeholder = (
  // Design a placeholder for the prompt message component to achieve consistent user interface in the reminder area.
  <Typography variant="body2" color="error" fontWeight={700} sx={{ visibility: 'hidden' }}>
    Exceeded the character limit.
  </Typography>
);

const WordCountLimit = ({ content, count }) => {
  console.log("------")
  console.log('content', content)
  return (
    <Grid item container direction="row" alignItems="center">
      {/* Control the word limit for the title: a message if the limit is exceeded & a word counter */}
      <Grid item xs>
        {content.length > count ? (
          <Typography variant="body2" color="error" fontWeight={700}>
            Exceeded the character limit.
          </Typography>
        ) : (
          placeholder
        )}
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary.main" sx={{ textAlign: 'right' }}>
          {content.length}/{count}
        </Typography>
      </Grid>
    </Grid>)
}

export default WordCountLimit