import dotenv from 'dotenv';
import app from './app';

dotenv.config(); // to read environment variables from .env file

const PORT: string | undefined = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
