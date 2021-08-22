import { Moment } from "moment";

interface Card {
  boardId: number;
  listId: number;
  name: string;
  description: string;
  id: number;
  image: string;
  created: Moment | string;
  deadline: Moment | string;
  completed: boolean;
}

export default Card;
