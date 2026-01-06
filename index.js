export default async ({ req, res, log }) => {
  log("Function executed successfully!");

  return res.json({
    success: true,
    message: "Function ran successfully",
  });
};
