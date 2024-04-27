import { Accounting } from "../../models/Account/accounting.model.js";
import { User } from "../../models/Account/user.model.js";

export const _create = async (date, total_value, total_margin, user_id) => {
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

    return newTransaction;
}