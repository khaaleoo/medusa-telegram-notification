export type TelegramNotificationOption = {
  botToken: string;
  debug?: boolean;
};

export type TelegramNotificationSendMessageRequestPayload = {
  chat_ids: string[];
  text: string;
  parse_mode?: string;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: string;
};
