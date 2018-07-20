import { Router } from 'express';

const routes = Router();

routes.get('/get-me', (req, res) => {
  return res.status(200).json({message: 'You just have hit the /get-me route.'})
});

export default routes;
