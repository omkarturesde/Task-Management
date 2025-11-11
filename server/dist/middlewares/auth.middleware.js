import { ZodError } from "zod";
export const validateData = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue) => ({
                    message: `${issue.path} is ${issue.message}`,
                }));
                res.status(400).json({
                    error: "Invalid Data",
                    details: errorMessages,
                });
            }
            else {
                res.status(500).json({
                    error: "Internal server error",
                });
            }
        }
    };
};
//# sourceMappingURL=auth.middleware.js.map