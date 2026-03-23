const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const {
  getJobs, getJobById, createJob, updateJob, deleteJob,
  saveJob, unsaveJob, getSavedJobs
} = require('../controllers/jobController');

const router = express.Router();
const { generateDescription } = require('../controllers/aiController');
router.post('/generate-description', authMiddleware, roleMiddleware('employer'), generateDescription);

router.get('/', getJobs);
router.get('/saved/me', authMiddleware, roleMiddleware('seeker'), getSavedJobs);
router.post('/saved/:jobId', authMiddleware, roleMiddleware('seeker'), saveJob);
router.delete('/saved/:jobId', authMiddleware, roleMiddleware('seeker'), unsaveJob);
router.get('/:id', getJobById);
router.post('/', authMiddleware, roleMiddleware('employer'), createJob);
router.put('/:id', authMiddleware, roleMiddleware('employer'), updateJob);
router.delete('/:id', authMiddleware, roleMiddleware('employer'), deleteJob);
// In jobRoutes.js or a new aiRoutes.js
// router.post('/generate-description', authMiddleware, roleMiddleware('employer'), generateDescription);
module.exports = router;