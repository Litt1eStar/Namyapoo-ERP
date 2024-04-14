import { _create } from "../../function/accounting/create.js";
import { Accounting } from "../../models/Account/accounting.model.js";
import { User } from "../../models/Account/user.model.js";

export const create = async (req, res) => {
  const { date, total_value, total_margin } = req.body;
  const user_id = req.user.id;
  console.log(user_id);
  if (!date || !total_value || !total_margin || !user_id)
    return res
      .status(400)
      .json({ error: "Account creadential is not complete" });

  try {
    const newTransaction = await _create(
      date,
      total_value,
      total_margin,
      user_id
    );

    if (!newTransaction)
      throw new Error(`Failed to create new Accounting Transaction`);

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  const user_id = req.user.id;

  try {
    const user = await User.findOne({ ref_user_id: user_id });
    if (!user) throw new Error(`User is not existed`);

    const transactions = await Accounting.find({ user_id: user._id });
    if (!transactions)
      throw new Error(`Failed to get all accounting transaction`);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemByFilteringDate = async (req, res) => {
  const { month, year } = req.params;
  const user_id = req.user.id;

  try {
    const user = await User.findOne({ ref_user_id: user_id });
    if (!user) throw new Error(`User not existed`);

    const targetMonth = month.trim();
    const targetYear = parseInt(year); // Convert year to integer

    // Construct start date and end date based on target month and year
    const startDate = new Date(`${targetMonth} 1, ${targetYear}`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Set to first day of next month

    const result = await Accounting.find({ user_id: user._id });

    if (!result) throw new Error(`Failed to find data for ${month} ${year}`);

    // Filter the result based on the target month and year
    const filteredResult = result.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() === startDate.getMonth() &&
        itemDate.getFullYear() === startDate.getFullYear()
      );
    });

    res.status(200).json(filteredResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAccDataByYear = async (req, res) => {
  const { year } = req.params;
  const user_id = req.user.id;
  if(!year || !user_id) return res.status(400).json({ error: "Credential Not Complete"});
  
  try {
    const user = await User.findOne({ref_user_id: user_id});
    if (!user){
      user = await User.create({ref_user_id: user_id});
    }

    const accData_from_user = await Accounting.find({ user_id: user._id });
    if (!accData_from_user) throw new Error(`Data not Found on This User`);

    const accData_filterd_by_year = accData_from_user.filter((data) => {
      const accData_year = data.date.split(" ")[2];
      return accData_year === year;
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

    const monthlyTotalMargin = {
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

    const monthlyTotalProfit = {
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

    //total sales
    accData_filterd_by_year.forEach((item) => {
      console.log(item)
      const date = new Date(item.date);
      const month = date.toLocaleString("en-US", { month: "long" });
      monthlyTotalValue[month] += item.total_value;
      monthlyTotalMargin[month] += item.total_margin;
      monthlyTotalProfit[month] += item.total_profit;
    });

    const arr_totalValue = Object.values(monthlyTotalValue);
    const arr_totalMargin = Object.values(monthlyTotalMargin);
    const arr_totalProfit = Object.values(monthlyTotalProfit);

    res.status(200).json({
      total_value: arr_totalValue,
      total_margin: arr_totalMargin,
      total_profit: arr_totalProfit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDataFromMonthAndYear = async (req, res) => {
  const { year, month } = req.params;
  const user_id = req.user.id;

   
  try {
    const user = await User.findOne({ ref_user_id: user_id });
    if (!user) throw new Error(`User not existed`);

    const targetMonth = month.trim();
    const targetYear = parseInt(year); 

    
    const startDate = new Date(`${targetMonth} 1, ${targetYear}`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); 

    const result = await Accounting.find({ user_id: user._id });

    if (!result) throw new Error(`Failed to find data for ${month} ${year}`);

    
    const filteredResult = result.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() === startDate.getMonth() &&
        itemDate.getFullYear() === startDate.getFullYear()
      );
    }); 
    
    const weeklyTotal = {};
    filteredResult.forEach((item) => {
      const itemDate = new Date(item.date);
      const weekNumber = Math.ceil((itemDate.getDate() + startDate.getDay()) / 7);
      if (!weeklyTotal[weekNumber]) {
        weeklyTotal[weekNumber] = {
          total_value: item.total_value,
          total_margin: item.total_margin,
          total_profit: item.total_profit,
        };
      } else {
        weeklyTotal[weekNumber].total_value += item.total_value;
        weeklyTotal[weekNumber].total_margin += item.total_margin;
        weeklyTotal[weekNumber].total_profit += item.total_profit;
      }
    });

    const weeklyValue = Object.values(weeklyTotal)
    console.log(weeklyValue)
    res.status(200).json(weeklyValue);
  } catch (error) {
    res.staus(500).json({ error: error.message});
  }
}