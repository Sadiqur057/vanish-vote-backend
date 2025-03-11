const Poll = require("../models/Poll");
const generateSlug = require("../utils/generateSlug");

const createPoll = async (req, res) => {
  try {
    const { question, expiresIn, ...rest } = req.body;

    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Question is required" });
    }

    const slug = generateSlug(question);

    let expiresAt;
    if (!expiresIn || isNaN(expiresIn)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid expiry time" });
    } else {
      expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + Number(expiresIn));
    }

    const poll = await Poll.create({
      question,
      slug,
      expiresAt,
      ...rest,
    });

    res.status(200).send({
      success: true,
      data: poll,
      message: "Poll created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPolls = async (req, res) => {
  try {
    const currentDate = new Date();
    const polls = await Poll.find({
      isPrivate: false,
      expiresAt: { $gt: currentDate },
    }).sort({
      createdAt: -1,
    });
    res.status(200).send({
      success: true,
      data: polls,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getSinglePoll = async (req, res) => {
  try {
    const { slug } = req.params;
    const poll = await Poll.findOne({ slug });
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).send({
      success: true,
      data: poll,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addVote = async (req, res) => {
  try {
    const { slug } = req.params;
    const { option } = req.body;
    const poll = await Poll.findOneAndUpdate(
      { slug, "options.option": option },
      { $inc: { "options.$.votes": 1 } },
      { new: true }
    );
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).send({
      success: true,
      data: poll,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addReaction = async (req, res) => {
  try {
    const { slug } = req.params;
    const { reaction } = req.body;
    const poll = await Poll.findOneAndUpdate(
      { slug },
      { $inc: { [`reactions.${reaction}`]: 1 } },
      { new: true }
    );
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).send({
      success: true,
      data: poll,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { comment } = req.body;
    const poll = await Poll.findOneAndUpdate(
      { slug },
      {
        $push: {
          comments: {
            comment,
          },
        },
      },
      { new: true }
    );
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).send({
      success: true,
      data: poll,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPoll,
  getPolls,
  getSinglePoll,
  addVote,
  addReaction,
  createComment,
};
