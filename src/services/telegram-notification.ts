import axios from "axios";
import { BaseService } from "medusa-interfaces";
import { TelegramNotificationOption, TelegramNotificationSendMessageRequestPayload } from "../types";

class TelegramNotificationService extends BaseService {
  protected readonly config_: TelegramNotificationOption = {
    botToken: "",
    debug: false,
  };

  private telegramUrl = "https://api.telegram.org";

  constructor(_container: any, config: TelegramNotificationOption) {
    super();
    this.config_ = { ...this.config_, ...config };
  }

  getBotToken() {
    return this.config_.botToken;
  }

  log(...args: any) {
    if (this.config_.debug) {
      console.log(...args);
    }
  }

  error(...args: any) {
    if (this.config_.debug) {
      console.error(...args);
    }
  }

  sendMessage(payload: TelegramNotificationSendMessageRequestPayload) {
    if (!Array.isArray(payload.chat_ids)) {
      payload.chat_ids = [payload.chat_ids];
    }

    const botToken = this.getBotToken();
    for (const chatId of payload.chat_ids) {
      const url = `${this.telegramUrl}/bot${botToken}/sendMessage`;
      const data = { ...payload, chat_id: chatId };
      axios
        .post(url, data)
        .then((res) => {
          this.log(`Send message to Telegram's chat ${chatId} successfully`, res.data);
        })
        .catch((err) => {
          this.error(`Send message to Telegram's chat ${chatId} failed`, err);
        });
    }
  }
}

export default TelegramNotificationService;
