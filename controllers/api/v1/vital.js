const Vital = require("../../../models/vitals");

module.exports.add = async function (req, res) {
  try {
    const userID = req.user.id;
    console.log(req.body);
    const newVital = { userID, ...req.body };
    await Vital.create(newVital);
    return res.status(200).json({
      message: "Record Added",
    });
  } catch (e) {
    return res.status(200).json({
      message: "Record Could not be added",
    });
  }
};
module.exports.getLatestVital = async function (req, res) {
  try {
    const userID = req.user.id;
    const type = req.params.type;

    const lastAddedVital = await Vital.findOne({ userID, type })
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .exec();
    console.log(lastAddedVital);
    return res.status(200).json({
      data: lastAddedVital,
    });
  } catch (e) {
    return res.status(200).json({
      message: "Record Could not be added",
    });
  }
};
