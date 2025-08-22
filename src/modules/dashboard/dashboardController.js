import Client from "../../database/models/clientModel.js";
import Contact from "../../database/models/contactModel.js";
import Pest from "../../database/models/pestModel.js";
import Service from "../../database/models/serviceModel.js";
import Tools from "../../database/models/toolsModel.js";
import { catchError } from "../../middleware/catchError.js";

const dashboard = catchError(async (req, res) => {
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  // Batch all queries using Promise.all for parallel execution
  const [
    clients,
    toolsCount,
    services,
    pestsCount,
    contacts,
    thisMonthClients,
    lastFiveClients,
    lastFiveServices,
    blockedContactsCount,
    serviceCounts,
  ] = await Promise.all([
    Client.find().lean(),
    Tools.countDocuments(),
    Service.find().lean(),
    Pest.countDocuments(),
    Contact.find().lean(),
    Client.find({ createdAt: { $gte: lastMonth } })
      .select("company image")
      .lean(),
    Client.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("company image createdAt")
      .lean(),
    Service.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Contact.countDocuments({ blocked: true }),
    Service.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]),
  ]);


  const activeServices = serviceCounts.find((s) => s.status)?.count || 0;
  const inactiveServices = serviceCounts.find((s) => !s.status)?.count || 0;


  const changePercentage =
    clients.length > 0
      ? Math.round((thisMonthClients.length / clients.length) * 100)
      : 0;

  const data = {
    clients: {
      name: "Clients",
      total: clients.length,
      lastMonth: thisMonthClients.length,
      changePercentage,
      lastFiveClients,
    },
    tools: {
      name: "Tools",
      total: toolsCount,
    },
    services: {
      name: "Services",
      total: services.length,
      lastFiveServices,
      active: activeServices,
      inactive: inactiveServices,
    },
    pests: {
      name: "Pests",
      total: pestsCount,
    },
    contacts: {
      name: "Contacts",
      total: contacts.length,
      blockedContacts: blockedContactsCount,
    },
  };

  res.status(200).json({
    message: "Dashboard fetched successfully",
    data,
  });
});

export default dashboard;
