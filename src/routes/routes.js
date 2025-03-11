const router = require("express").Router();

const {
  createPoll,
  getPolls,
  getSinglePoll,
  addVote,
  addReaction,
  createComment
} = require("../controllers/pollController");

router.post("/polls", createPoll);
router.get("/polls", getPolls);
router.get("/polls/:slug", getSinglePoll);
router.put("/polls/vote/:slug", addVote);
router.put("/polls/reaction/:slug", addReaction);
router.put("/polls/comment/:slug", createComment);

module.exports = router;
