import jwt from "jsonwebtoken";
import connection from "../database.js";
import * as financeService from "../service/finance.service.js";

async function storeFinance(req, res) {
  try {
    const header = req.headers.authorization || "";
    let user = await financeService.authenticate({ header });

    if (!user) return res.sendStatus(401);
    const { value, type } = req.body;

    if (!value || !type) {
      return res.sendStatus(400);
    }

    if (!["INCOME", "OUTCOME"].includes(type)) {
      return res.sendStatus(400);
    }

    if (value < 0) {
      return res.sendStatus(400);
    }

    await financeService.createFinance({ id: user, value, type });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function listFinances(req, res) {
  try {
    const header = req.headers.authorization || "";
    let user = await financeService.authenticate({ header });

    if (!user) return res.sendStatus(401);
    const finances = await financeService.listFinances({ user });

    res.send(finances);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getSum(req, res) {
  try {
    const header = req.headers.authorization || "";
    let user = await financeService.authenticate({ header });

    if (!user) return res.sendStatus(401);

    const finances = await financeService.listFinances({ user });
    const sum = financeService.sumFinances(finances);
    res.send({ sum: sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export { storeFinance, listFinances, getSum };
