import axios from "axios";

const DATACENTER = process.env.MAILCHIMP_API_SERVER;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;

export const SubscribeUser = async (data: {
  email_address: string;
  status: "subscribed";
}) => {
  const result = await axios.post(
    `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
    data,
    {
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return result;
};
