import express, { Request, Response } from "express";

const router = express.Router();

router.post("/array", async (req: Request<{ array: any[] }>, res: Response) => {
  try {
    const { array }: { array: any[] } = req.body;

    if (!array || !Array.isArray(array)) {
      throw new Error("Invalid request body. Expected as array");
    }

    const newArray1: number[] = array.concat([6, 7, 8]);
    res.json(`Array Concat Method - New array is ${newArray1}`);

    const index: number = array.lastIndexOf(3);
    res.json(`LastIndexOf: ${index}`);

    array.push(6);

    res.json(`Push :${array}`);

    const splicedArray: number[] = array.splice(1, 2);
    res.json(`Splice: ${splicedArray}`);

    const poppedItem: number | undefined = array.pop();
    res.json(`Pop:${poppedItem}`);

    const slicedArray: number[] = array.slice(1, 3);
    res.json(`Slice:${slicedArray}`);

    const mappedArray: number[] = array.map((item) => item * 2);
    res.json(`Map:${mappedArray}`);

    const shiftedItem: number | undefined = array.shift();
    res.json(`Shift:${shiftedItem}`);

    const filteredArray: number[] = array.filter((item) => item > 2);
    res.json(`Filter:${filteredArray}`);

    array.unshift(0);
    res.json(`Unshift:${array}`);

    array.forEach((item) => res.json(`ForEach:${item}`));

    const foundItem: number | undefined = array.find((item) => item === 3);
    res.json(`Find:${foundItem}`);

    const joinedString: string = array.join("-");
    res.json(`Join:${joinedString}`);

    const foundIndex: number = array.findIndex((item) => item === 4);
    res.json(`FindIndex:${foundIndex}`);

    const stringRepresentation: string = array.toString();
    res.json(`ToString ${stringRepresentation}`);

    const someResult: boolean = array.some((item) => item > 3);
    res.json(`Some:${someResult}`);

    const stringToSplit: string = "Hello World";
    const splitArray: string[] = stringToSplit.split(" ");
    res.json(`Split:${splitArray}`);

    const everyResult: boolean = array.every((item) => item > 0);
    res.json(`Every: ${everyResult}`);

    const replacedString: string = stringToSplit.replace("World", "Universe");
    res.json(`Replace:${replacedString}`);

    const includesResult: boolean = array.includes(3);
    res.json(`{Includes: ${includesResult}`);

    const indexOfItem: number = array.indexOf(2);
    console.log(`IndexOf:" ${indexOfItem}`);
  } catch (error) {
    console.log("error");
  }
});
export default router;
