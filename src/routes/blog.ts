import { Request, Router } from 'express';
import { getBlogValidator, createBlogValidator, updateBlogValidator } from '../validators/blog';
import { blogController } from '../controllers/Blog.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { JwtPayload } from 'jsonwebtoken';
import { BlogProperties } from '../services/blog/blog';

interface CreateBlogRequest extends Request {
    body: Omit<BlogProperties, 'id'| 'done'>;
    user: {
        id: number;
    }
}

interface UpdateBlogRequest extends Request {
    body: Partial<Omit<BlogProperties, 'id'>>;
    user: {
      id: number;
    };
  }

interface GetBlogRequest extends Request {
    user: {
        id: number;
    };
}

interface MyRequest extends Request {
    user: string | JwtPayload;
  }




const router = Router();

router.get('/:id', getBlogValidator, (req, res) =>
  blogController.getOneById(req as GetBlogRequest, res)
);
router.get('/', (req, res) => blogController.getAll(req as GetBlogRequest, res));
router.post('/', (req, res, next) => authMiddleware(req as MyRequest, res, next), createBlogValidator, (req, res) => blogController.create(req as CreateBlogRequest, res));
router.patch('/:id', (req, res, next) => authMiddleware(req as unknown as MyRequest, res, next), updateBlogValidator, (req, res) => blogController.update(req as unknown as UpdateBlogRequest, res));
router.delete('/:id', (req, res, next) => authMiddleware(req as unknown as MyRequest, res, next), (req, res) => blogController.delete(req as unknown as GetBlogRequest, res));

export default router;
