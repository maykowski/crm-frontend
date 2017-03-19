import {Followup} from "./followup";
import {Training} from "./training";
export class Contact {
  id: number;
  lid: string;
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  company: string;
  link: string;
  phoneSummary: string;
  summary: string;
  createDate: string;
  updateDate: string;
  followups: Followup[];
  lastFollowupDate:string;
  training: Training;
  selected:boolean;
}
