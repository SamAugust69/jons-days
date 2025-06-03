import fs from "fs";

fs.createReadStream("./src/lib/days.csv")
  .on("error", (err) => {
    console.log(err);
  })
  .on("data", (row) => {
    const asString = Buffer.from(row).toString("latin1");

    const rows = asString.split("\r\n");

    const final = [];

    rows.forEach((row) => {
      const max = 6;
      const value = Math.floor(1 + Math.random() * max) * 100;

      console.log(row.split(","));
      const columns = row.split(",");
      final.push({
        name: columns[0],
        month: columns[1],
        day: columns[2],
        value,
      });
    });

    fs.writeFileSync("days.json", JSON.stringify(final));
  })
  .on("end", () => {
    console.log("end");
  });
