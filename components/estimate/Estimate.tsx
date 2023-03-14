import { Box, maxWidth, maxHeight } from '@mui/material';
import Container from '@mui/material/Container';

function Estimate({ children }) {
    return (
        <Box
            className="py-5"
            sx={{
                width: maxWidth,
                height: maxHeight,
                backgroundColor: 'primary.main',
            }}

        > <Container
            className="bg-blue-500"
            sx={{
                width: maxWidth,
                color: 'white',
                pt: 2,

            }}>
                {children}
            </Container>
        </Box>
    )
}

export default Estimate;