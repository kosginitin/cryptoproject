// import { createHash } from "crypto";

const createHash = require("crypto").createHash;

const MarkleeHash = (transactions) => {
  if (transactions.length % 2 !== 0) {
    transactions[transactions.length] = transactions[transactions.length - 1];
  }
  let final = [];

  for (let i = 0; i < transactions.length; i += 2) {
    let hash = createHash("sha256");
    final.push(
      hash
        .update(transactions[i])
        .update(transactions[i + 1])
        .digest("hex")
        .toString()
    );
  }

  if (final.length === 1) {
    return final[0];
  }
  return MarkleeHash(final);
};
export default MarkleeHash;
