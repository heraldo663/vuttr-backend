/* eslint-disable class-methods-use-this */
const Tool = require("../model/Tool");

class ToolController {
  /**
   * Get all tools in the database or search by a query string that contain tag param
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    let tools;

    if (req.query.tag) {
      tools = await Tool.searchByTag([req.query.tag]);
      return res.status(200).json({ tools });
    }

    tools = await Tool.find({});
    return res.status(200).json({ tools });
  }

  /**
   * Delete a tool by the id received in the params.
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    await Tool.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  }

  /**
   * Create a new tool.
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const tool = await Tool.create(req.body);
    return res.status(201).json(tool);
  }
}

module.exports = new ToolController();
