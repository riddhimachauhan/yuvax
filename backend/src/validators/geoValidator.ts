import { validateRequest } from "../middlewares/validationMiddleware";

export const validateGeoQuery = validateRequest([
  {
    field: "ip",
    required: false,
    in: "params",
    type: "string",
    custom: (value: string) => {
      if (!value) return true; // optional
      // Basic IPv4 validation
      const ipRegex = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
      return ipRegex.test(value) || "Invalid IP address format";
    },
  },
]);
