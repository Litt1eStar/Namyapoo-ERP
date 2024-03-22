import axios from "axios";

export const lineNotify = async(message) => {
    try {
        const response = await axios({
            method: "POST",
            url: "https://notify-api.line.me/api/notify",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${process.env.LINE_TOKEN}`
            },
            data: `message=${message}`
        })

        console.log(`Line Notift respones: ${response}`);
    } catch (error) {
        console.log(error);
    }
}