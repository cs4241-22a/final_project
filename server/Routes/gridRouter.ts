import express, { Request, Response } from "express";
import Cell, { ICell } from "../DB_Schema/cellSchema.js";

//Server scoped arrays
const GRID_SIZE = 50 * 50;
const grid = Array<ICell>(GRID_SIZE);

/* ------------- CONFIGURATION ------------- */

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (grid[0] === undefined) {
    await populateArray();
  }
  res.type("application/json");
  res.send({ grid: grid });
});

async function populateArray() {
  await Cell.find({}, (error: any, docs: ICell[]) => {
    //if there are not the right number of cells in the DB
    if (docs.length < GRID_SIZE) {
      //add the missing cells to the server array
      for (var i = docs.length; i < GRID_SIZE; i++) {
        grid[i] = new Cell({ index: i });
      }
      //overwrite the grid collection in the DB with the server representationf
      Cell.deleteMany({});
      Cell.insertMany(grid).then(() => {
        console.log("a ton of new entries in the DB");
      });
      //if there are the correct number of entries in the database
    } else {
      //read in the cells from the database into the server's grid
      for (const i in docs) {
        grid[i] = docs[i];
      }
    }
  }).clone(); //cloning makes the query repeatable
  grid.sort();
}

router.post("/update", async (req: Request, res: Response) => {
  req.on("data", (data) => {
    data = JSON.parse(data);

    if (req.user !== undefined) {
      console.log(typeof grid[data.index]);
      grid[data.index].index = data.index;
      grid[data.index].emoji = data.emoji;
      grid[data.index].timeStamp = new Date(Date.now());
      grid[data.index].user = req.user.toString();
      updateCell(grid[data.index]);
    }
  });
  res.sendStatus(200);
});

router.get("/cell", (req: Request, res: Response) => {
  req.on("data", (data) => {
    requestCell(data.index).then((cell) => {
      res.send(cell);
    });
  });
});

async function updateCell(cellData: ICell) {
  const updatedCell = await Cell.findOneAndUpdate(
    { index: cellData.index },
    {
      emoji: cellData.emoji,
      user: cellData.user,
      timestamp: cellData.timeStamp,
    },
    {
      new: true,
      upsert: true,
    }
  );
  console.log(updatedCell);
  return updatedCell;
}

async function requestCell(cellIndex: number) {
  return await Cell.find({ index: cellIndex }).exec();
}

export { router };
