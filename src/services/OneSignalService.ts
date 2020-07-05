import { Client } from 'onesignal-node';

interface SendNotificationInterface {
  playersId: [string];
  message: string;
  header: string;
}

const client = new Client(String(process.env.ONE_SIGNAL_APP_ID), String(process.env.ONE_SIGNAL_APP_KEY));

export async function sendNotification({ header, playersId, message }: SendNotificationInterface) {
  client
    .createNotification({
      include_player_ids: playersId,
      contents: {
        en: message,
        'pt-br': message,
      },
      headings: {
        en: header,
        'pt-br': header,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
