import { writable, type Writable } from "svelte/store";

export const userStore: Writable<User> = writable();