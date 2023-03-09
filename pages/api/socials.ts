import { validateSocial } from "@features/socials/service/social";
import httpInstance from "@utils/http";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === "POST") {
    const social = req.body;
    const err = validateSocial(social);
    const hasErr = Object.keys(err).some((key) => !!(err as any)[key]);
    if (hasErr) {
      res.status(400).send({
        code: 400,
        message: "Bad request",
        data: err,
      });
    } else {
      httpInstance
        .post("/interview/social", social)
        .then((_social) =>
          res.status(200).send({
            code: 200,
            message: "success",
            data: _social,
          }),
        )
        .catch((reason) => {
          console.log({ reason: JSON.stringify(reason) }); // logs
          res.status(404).send({
            code: 401,
            message: JSON.stringify(reason),
          });
        });
    }
  } else {
    res.status(404).send({
      code: 404,
      message: "Not found",
    });
  }
}
