import { Clients } from "./clients.model";
import { Types } from "./types.model";

export interface Policies {
    id: String,
    clientId: Number,
    danger: Number,
    date: String,
    description: String,
    name: String,
    period: Number,
    price: Number,
    typeId: Number,
    client: Clients,
    type: Types
}