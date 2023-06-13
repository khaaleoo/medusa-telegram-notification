# Medusa Telegram Notification Plugin

The **medusa-telegram-notification** plugin allows Medusa Server to send push notifications to Telegram. It provides a simple way to integrate Telegram notifications into your Medusa Server application.

## Installation

You can install the **medusa-telegram-notification** plugin using npm, yarn, or pnpm.

**npm:**
```
npm install medusa-telegram-notification
```

**yarn:**
```
yarn add medusa-telegram-notification
```

**pnpm:**
```
pnpm install medusa-telegram-notification
```

## Configuration

To use the plugin, you need to add it to your `medusa-config.js` file.

```javascript
// medusa-config.js
{
  resolve: `medusa-telegram-notification`,
  options: {
    botToken: process.env.NOTIFICATION_TELEGRAM_BOT_TOKEN,
    debug: true || process.env.NODE_ENV === "development",
  },
}
```

Make sure to replace `process.env.NOTIFICATION_TELEGRAM_BOT_TOKEN` with the actual bot token for your Telegram bot. You can obtain a bot token by creating a new bot on the Telegram BotFather platform.

## Usage

Once you have configured the plugin, you can use the provided sample code as a starting point for sending notifications. Here's an example of how to use the `MyNotificationService` class to handle an order placement event:

```typescript
// my-notification.ts
import { BaseService } from "medusa-interfaces";
import { toVNCurrencyFormat } from "../utils/currency";

const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

class MyNotificationService extends BaseService {
  telegramNotificationService_;

  constructor({ telegramNotificationService }) {
    super();

    this.telegramNotificationService_ = telegramNotificationService;
  }

  handleOrderPlaced(order) {
    const customerInfo = `${[order.customer.email, order.customer.phone].filter((e) => e).join(" - ")}`;
    const message = [
      `💌 Order *#${order.display_id}* placed successfully`,
      `📝 Order details: [view](${ADMIN_BASE_URL}/a/orders/${order.order_id})`,
      `🍭 Customer: ${customerInfo} ([details](${ADMIN_BASE_URL}/a/customers/${order.customer.id}))`,
      `💰 Total amount: ${toVNCurrencyFormat(order.reporting_total)}`,
      `🚚 Shipping address: ${order.shipping_district}, ${order.shipping_city}`,
    ].join("\n");

    const payload = {
      chat_ids: [TELEGRAM_GROUP_ID],
      text: message,
      parse_mode: "Markdown",
    };

    this.telegramNotificationService_.sendMessage(payload);
  }
}

export default MyNotificationService;

```

The `MyNotificationService` class extends the `BaseService` provided by Medusa Server. It uses the `telegramNotificationService` to send a Telegram message with information about the placed order. You can customize the content of the message according to your requirements.

Additionally, you can use the `toVNCurrencyFormat` function from the `currency.ts` file to format the order total in Vietnamese currency (VND).

Feel free to modify and extend the `MyNotificationService` class to handle other events or add more functionality as needed.

## Support

If you encounter any issues or have questions regarding the **medusa-telegram-notification** plugin, please open an issue on the [GitHub repository](https://github.com/your-plugin-repository). We'll be happy to assist you.

## License

This plugin is licensed under the [MIT License](https://opensource.org/licenses/MIT).