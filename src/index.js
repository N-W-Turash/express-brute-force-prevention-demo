import app from './app';
const { PORT = 8001 } = process.env;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
