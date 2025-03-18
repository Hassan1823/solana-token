import create, { State } from "zustand";
import produce from "immer";

interface NotificationStore extends State {
  notification: Array<{
    type: string;
    message: string;
    description?: string;
    txid?: string;
  }>;
  set: (x: any) => void;
}

const useNotificationStore = create<NotificationStore>((set, _get) => ({
  notification: [],
  set: (fn) => set(produce(fn)),
}));

export default useNotificationStore;

// use just need to call the component
// and pass the type message description and id
// and it will display all the data
