import {ICinema} from "../../utils/api/types";

export interface ICinemaStore {
   cinema: ICinema | null,
   isCinemaPage: boolean
}