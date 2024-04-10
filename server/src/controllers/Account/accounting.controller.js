import { Accounting } from "../../models/Account/accounting.model.js";
import { User } from "../../models/Account/user.model.js";

export const create = async (req, res) => {
  const { date, total_value, total_margin, user_id } = req.body;
  
  if (!date || !total_value || !total_margin || !user_id)
    return res
      .status(400)
      .json({ error: "Account creadential is not complete" });

  try {
    const user = await User.findOne({ ref_user_id: user_id });
    let userIdForTransaction;
    if(!user){
        const newUser = await User.create({ ref_user_id: user_id });
        console.log(`User is not Found so Create new User`)
        userIdForTransaction = newUser._id;
    }else{
        console.log(`Existed User | Create new Item for User`)
        userIdForTransaction = user._id;
    }
        
    const newTransaction = await Accounting.create({
      date,
      total_value,
      total_margin,
      total_profit: total_value - total_margin,
      user_id: userIdForTransaction
    });

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
