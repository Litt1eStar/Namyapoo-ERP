import { _create } from "../../function/accounting/create.js";
import { Accounting } from "../../models/Account/accounting.model.js";
import { User } from "../../models/Account/user.model.js";

export const create = async (req, res) => {
  const { date, total_value, total_margin } = req.body;
  const user_id = req.user.id;
  console.log(user_id)
  if (!date || !total_value || !total_margin || !user_id)
    return res
      .status(400)
      .json({ error: "Account creadential is not complete" });

  try {
    const newTransaction = await _create(date, total_value, total_margin, user_id);

    if(!newTransaction)
        throw new Error(`Failed to create new Accounting Transaction`);

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

export const getAll = async (req, res) => {
    const user_id = req.user.id;

    try {
        const user = await User.findOne({ ref_user_id: user_id });
        if(!user) throw new Error(`User is not existed`)
        
        const transactions = await Accounting.find({ user_id: user._id });
        if(!transactions) throw new Error(`Failed to get all accounting transaction`);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
