import { Box, maxWidth } from '@mui/material';
import Container from '@mui/material/Container';


function Estimate({children}) {
    return (
        <Box
            sx={{
                width: maxWidth,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}

        > <Container sx={{
            width: maxWidth,
            color: 'white',
            pt: 2,

        }}> {children}
            </Container>
        </Box>
    )
}

export default Estimate;