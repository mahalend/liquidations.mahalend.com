const formatErrorMessage = (message: string): string => {
  message = message.toLowerCase();

  console.log("message", message);
  if (message.includes("cannot add to expired lock. withdraw"))
    return "Cannot add to an expired lock. You need to Withdraw.";
  if (message.includes("user rejected transaction :("))
    return "You cancelled the transaction.";
  if (message.includes("User denied transaction signature"))
    return "You denied the approval.";

  // Fail safes like overflows etc.;
  return "Error Occured, Please try again later.";
};

export default formatErrorMessage;
