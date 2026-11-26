const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const result = await aiService(code);

    let reviewText = "No response from AI";

    if (Array.isArray(result) && result[0]?.generated_text) {
      reviewText = result[0].generated_text;
    } else if (result?.generated_text) {
      reviewText = result.generated_text;
    } else if (typeof result === "string") {
      reviewText = result;
    }

    res.status(200).json({ review: reviewText });

  } catch (error) {
    console.error("AI Review Error:", error);
    res.status(500).json({ review: "Failed to generate code review" });
  }
};
