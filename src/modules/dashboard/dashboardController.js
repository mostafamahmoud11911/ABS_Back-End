import Client from "../../database/models/clientModel.js";
import Service from "../../database/models/serviceModel.js";
import Tools from "../../database/models/toolsModel.js";
import { catchError } from "../../middleware/catchError.js";

const dashboard = catchError(async (req, res) => {
  const client = await Client.find();
  const tools = await Tools.find();
  const services = await Service.find();

  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  const thisMonthClients = await Client.find({
    createdAt: { $gte: lastMonth },
  }).select("company image -_id");

  const changePercentage = parseInt(
    (thisMonthClients.length / client.length) * 100
  );

  const lastFiveClients = await Client.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("company image -_id");

  const lastFiveServices = await Service.find()
    .sort({ createdAt: -1 })
    .limit(5);

  const data = {
    clients: {
      name: "Clients",
      total: client.length,
      lastMonth: thisMonthClients.length,
      changePercentage: changePercentage,
      lastFiveClients,
    },
    tools: { name: "Tools", total: tools.length },
    services: { name: "Services", total: services.length, lastFiveServices },
  };

  res.status(200).json({ message: "Dashboard fetched successfully", data});
});

export default dashboard;
