import { rest } from "msw";
import { Message } from "../features/home/hooks/useFetchMessage";

export const handlers = [
  rest.get("/api/v1/index/:id", (req, res, ctx) => {

    const { id: messageId } = req.params;

    const dummyData: Message = {
      id: messageId as string,
      sender: "John",
      sentTime: "2023-08-05T16:24:27+09:00",
      title: "Hello",
      priority: "緊急",
    };

    // POST時にbase64にエンコードして送信する想定と思われる。確認必要。
    const encodeToBase64 = (obj: Message): string => {
      const jsonStr = JSON.stringify(obj);
      const base64Str = window.btoa(unescape(encodeURIComponent(jsonStr)));
      return base64Str;
    };

    const encodedData = encodeToBase64(dummyData);

    return res(ctx.status(200), ctx.json(encodedData));
  }),
];
