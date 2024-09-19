import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export function ProjectsTitle() {
  return (
    <Container>
      <Box display="flex" alignItems="center" sx={{ pt: 5 }}>
        <Typography variant="h2" sx={{ flexGrow: 1 }}>
          Projects
        </Typography>
      </Box>
    </Container>
  );
}
