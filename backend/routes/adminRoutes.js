

import express from 'express' 
const router   = express.Router()

import { authAdmin,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    updateUserData,
    deleteUserData,
    blockUser,
    unblockUser,
    getAllTutors,

    deleteTutorData,
    blockTutor,
    unblockTutor,
    getDomains,
    addDomain,
    deleteDomain
 } from '../controllers/adminController.js'

 import {protect } from '../middleware/authAdminMiddleware.js'
 

router.post('/authAdmin' ,authAdmin);
 router.post('/admin' ,registerAdmin);
 router.post('/adminLogout' ,logoutAdmin);
 router.get('/usersList' ,getAllUsers);
 router.get('/tutorList',getAllTutors)
 router.post('/delete-user',  deleteUserData);
//   router.route() put('/adminUpdateUserDetails' ,updateUserDetails);
router.put('/update-user', updateUserData);
router.post("/block-user", blockUser);
router.post("/unblock-user", unblockUser);

router.post('/delete-tutor' ,deleteTutorData);
router.post('/block-tutor',blockTutor);
router.post('/unblock-tutor' ,unblockTutor)

router.get("/domain",getDomains)
router.post("/add-domain", addDomain);
router.delete("/domains/:domainName",  deleteDomain);


export default router;
