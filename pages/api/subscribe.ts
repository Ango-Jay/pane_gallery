import { SubscribeUser } from "@/lib/mailchimp";
import type { NextApiResponse, NextApiRequest } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
console.log(req.body.email);

try {
    const response = await SubscribeUser({
        email_address: req.body.email,
        status:"subscribed"
      });
    
      if (response.status >= 400) {
        return res.status(400).json({
          error: `There was an error subscribing to the newsletter.`,
        });
      }
    
      return res.status(201).json({ error: '' });
} catch (error) {
    if(error instanceof Error) {
return res.status(500).json({ error: error.message });
    }
    return (error as {}).toString()
}
}
