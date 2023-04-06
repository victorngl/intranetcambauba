import { Box } from '@mui/material';
import Container from '@mui/material/Container';

function Estimate({ children }) {
    return (
        <Box
            className="py-5"
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'primary.main',
            }}

        > <Container
            className='bg-white rounded-lg p-10'
            sx={{
                width: '100%',
                color: '#0288d1',
            }}>
                {children}
            </Container>
        </Box>
    )
}

export default Estimate;