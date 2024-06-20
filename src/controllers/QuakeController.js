import QuakeService from "../services/QuakeService.js";
const quakeService = new QuakeService();

export default class QuakeController {
  async getData(req, res) {
    const data = await quakeService.parseLog();
    res.status(200).json(data);
  }
}
