import { Router } from 'express';

const mappingRouter = Router();

mappingRouter.get('/', (req, res) => {
  const { latitude, longitude } = req.query;
});
