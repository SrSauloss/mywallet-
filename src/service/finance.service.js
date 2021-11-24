import jwt from "jsonwebtoken";
import * as financeRepository from "../repositories/finance.repository.js";

async function authenticate({ header }) {
  const token = header.split("Bearer ")[1];

  if (!token) {
    return null;
  }

  const user = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) return null;
      return decoded.id;
    }
  );

  return user;
}

async function createFinance({ id, value, type }) {
  await financeRepository.create({ id, value, type });
}

async function listFinances({ user }) {
  const finances = await financeRepository.getAllFinancesForUser({ user });
  return finances;
}

function sumFinances(finances) {
  const sum = finances.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );
  return sum;
}
export { authenticate, createFinance, listFinances, sumFinances };
