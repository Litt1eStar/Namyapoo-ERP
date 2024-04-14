import redisClient from "../../redisClient.js";
import { _create } from "../function/stockHistory/create.js";
import StockHistory from "../models/stockHistory.model.js";
import User from "../models/user.model.js";

export const getAll = async (req, res) => {
  const user_id = req.user.id;

  if (!user_id) return res.status(500).json({ error: "Token not provided" });

  try {
    const historys = await StockHistory.find({ user_id });
    if (!historys)
      return res.status(400).json({ error: "Failed to get history" });

    //await redisClient.set(`stockHistorys:${user_id}`, JSON.stringify(historys));
    res.status(200).json(historys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const { product_name, stock_type, amount, createdAt } = req.body;
  const user_id = req.user.id;

  if (!product_name || !stock_type || !amount || !createdAt)
    return res.status(500).json({ error: "Credential is not complete" });

  if (!user_id) return res.status(500).json({ error: "Token not provided" });

  try {
    const newHistory = await _create(
      product_name,
      stock_type,
      amount,
      createdAt,
      user_id
    );
    if (!newHistory)
      return res.status(400).json({ error: "Failed to create new History" });

    console.log(`CREATE HISToRY`);
    res.status(200).json(newHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDataByYear = async (req, res) => {
  const user_id = req.user.id;
  const { year, product } = req.params;
  
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: "Token not validate" });

    const historys = await StockHistory.find({ user_id });
    const filterdData = historys.filter((history) => {
      const createdYear = history.createdAt.split("/")[2];
      if (product !== "all") {
        const productName = history.product_name;
        return createdYear == year && productName == product;
      } else {
        return createdYear == year;
      }
    });

    const monthlyTotalValue = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    filterdData.forEach((item) => {
      const createdAt = item.createdAt.split("/"); // Assuming createdAt format is 'DD/MM/YYYY'
      const day = parseInt(createdAt[0]);
      const month = parseInt(createdAt[1]) - 1; // Months are zero-based (0 = January, 1 = February, etc.)
      const year = parseInt(createdAt[2]);
      const date = new Date(year, month, day);
      
      if (!isNaN(date.getTime())) {
        // Check if date is valid
        const monthName = date.toLocaleString("en-US", { month: "long" });
        if(item.stock_type === "Export"){
          monthlyTotalValue[monthName] += parseInt(item.amount);
        }else if(item.stock_type === "Import"){
          monthlyTotalValue[monthName] -= parseInt(item.amount);
        }
      }
    });

    const arr_totalValue = Object.values(monthlyTotalValue);

    res.status(200).json(arr_totalValue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDataFromMonthAndYear = async (req, res) => {
  const { year, month, product } = req.params;
  const user_id = req.user.id;

  try {
    const user = await User.findById(user_id);
    if (!user) throw new Error(`User not existed`);

    const targetMonth = month.trim();
    const targetYear = parseInt(year);

    const startDate = new Date(`${targetMonth} 1, ${targetYear}`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const historys = await StockHistory.find({ user_id });

    const filteredHistorys = historys.filter((history) => {
      const [day, month, year] = history.createdAt.split('/');
      const historyDate = new Date(`${year}-${month}-${day}`); 

      if(product !== "all"){
        return (
          historyDate.getMonth() === startDate.getMonth() &&
          historyDate.getFullYear() === startDate.getFullYear() &&
          history.product_name === product
        );
      } else {
        return (
          historyDate.getMonth() === startDate.getMonth() &&
          historyDate.getFullYear() === startDate.getFullYear()
        );
      }
    });

    const weeklyTotal = {};

    filteredHistorys.forEach((history) => {
      const [day, month, year] = history.createdAt.split('/');
      const historyDate = new Date(`${year}-${month}-${day}`); 
      const weekNumber = Math.ceil(
        (historyDate.getDate() + startDate.getDay()) / 7
      );

      if (!weeklyTotal[weekNumber]) {
        weeklyTotal[weekNumber] = {
          total_amount: 0, // Initialize total amount
        };
      }

      if (history.stock_type === "Export") {
        weeklyTotal[weekNumber].total_amount += parseInt(history.amount);
      } else if (history.stock_type === "Import") {
        weeklyTotal[weekNumber].total_amount -= parseInt(history.amount);
      }
    });

    const weeklyData = Object.values(weeklyTotal);
    const formattedData = weeklyData.map(data => {
      return data.total_amount
    })
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
