import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
var ses = new SESClient({ region: "eu-west-2" });

export const handler = async (event) => {
  console.log("Event:", event);
  const eventData = JSON.parse(event.body);

  // Extract the values you need
  const email = eventData.email;
  const name = eventData.name;
  const message = eventData.message;


  const emailBody = `Hello,\n\nYou have received a new message via the contact form on your website. Below are the details of the message:\n\n**Sender Information:**\n- Name: ${name}\n- Email: ${email}\n\n**Message:**\n${message}\n\nPlease respond to this message at your earliest convenience.`


  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ['marika.bergman@gmail.com'],
    },
    Message: {
      Body: {
        Text: { Data: emailBody },
      },

      Subject: { Data: "New Message from Contact Form" },
    },
    Source: 'marika.bergman@gmail.com',
  });


  try {
    let response = await ses.send(command);

    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
    };

    return response;


  } catch (error) {
    console.error('Error:', error);


    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};