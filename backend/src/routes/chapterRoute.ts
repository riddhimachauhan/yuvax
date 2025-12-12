// import { Router } from 'express';
// import { chapterController } from '../controllers/chapterController';
// import { authenticate, authorize } from '../middlewares/authMiddleware';
// import { USER_ROLES } from '../utils/constants';

// const router = Router();

// // Public routes (no authentication required)
// router.get('/allchapters', chapterController.getAllChapters);
// router.get('/:chapter_id', chapterController.getChapterById);
// router.get('/:chapterId/stats', chapterController.getChapterStats);
// router.get('/module/:moduleId', chapterController.getChaptersByModule);
// router.get('/search', chapterController.searchChapters);


// router.post('/createchapter', chapterController.createChapter);
// router.put('/updatechapter/:chapter_id', chapterController.updateChapter);
// router.delete('/deletechapter/:chapter_id', chapterController.deleteChapter);

// export default router;
import { Router } from 'express';
import { chapterController } from '../controllers/chapterController';
import { validateChapterCreation, validateChapterUpdate, validateChapterId } from '../validators/chapterValidator';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public routes
router.get('/allchapters', chapterController.getAllChapters);
router.get('/:chapter_id', validateChapterId, chapterController.getChapterById);
router.get('/:chapterId/stats', chapterController.getChapterStats);
router.get('/module/:moduleId', chapterController.getChaptersByModule);
router.get('/search', chapterController.searchChapters);
router.post('/createchapter', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), validateChapterCreation, chapterController.createChapter);
router.put('/updatechapter/:chapter_id', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), validateChapterId, validateChapterUpdate, chapterController.updateChapter);
router.delete('/deletechapter/:chapter_id', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), validateChapterId, chapterController.deleteChapter);

export default router;
